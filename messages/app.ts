import { server, ServerApplicationState } from '@hapi/hapi';
import { connect, Channel, ChannelWrapper } from 'amqp-connection-manager';

interface App extends ServerApplicationState {
    channel: ChannelWrapper;
}

const client = server({
    port: 3000,
    host: 'localhost'
});

const connection = connect(['amqp://localhost']);

// create a new event emitter for RabbitMQ messages
const messageEmitter = client.events;
let channel: ChannelWrapper;

connection.on('connect', () => {
    channel = connection.createChannel({
        json: true,
        setup: (channel: Channel) => {
            const exchange = 'my-exchange';
            channel.assertExchange(exchange, 'topic', { durable: false });
            const queue = 'my-queue';
            channel.assertQueue(queue, { durable: false });
            channel.bindQueue(queue, exchange, 'my-key');
            console.log('Connected to RabbitMQ');
            return Promise.resolve();
        }
    });

    channel.consume('my-queue', message => {
        const parsedMessage = JSON.parse(message.content.toString());
        // emit the incoming message to any subscribers
        messageEmitter.emit('my-message', parsedMessage);
    });
});

// route for subscribing to messages
client.route([
    {
        method: 'POST',
        path: '/subscribe',
        handler: async (request, h) => {
            const { subscriberId } = request.payload as any;
            // subscribe the client to the 'my-message' event
            messageEmitter.on('my-message', message => {
                // send the message to the subscriber using websockets
                channel.publish(`/subscribers/${subscriberId}`, message);
            });
            return h.response({ success: true });
        }
    },
    {
        method: 'POST',
        path: '/publish',
        handler: async (request, h) => {
            const message = request.payload;

            // Publish the message to the exchange
            channel.publish('my-exchange', 'my-key', message);

            return h.response({ success: true });
        }
    }
]);

client.start();
