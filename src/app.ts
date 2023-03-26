import { notFound } from '@hapi/boom';
import { server } from '@hapi/hapi';
import { config } from 'dotenv';
import { readFileSync } from 'fs-extra';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { validate } from './helpers';
import { Routes } from './routes';

const init = async () => {
    try {
        const { error } = config({ path: `${__dirname}/.env` });

        if (error) {
            throw notFound('Environment file missing.');
        }

        const client = server({
            host: process.env.HOST!,
            port: process.env.PORT!,
            routes: {
                cors: {
                    origin: ['*'],
                    headers: ['Accept', 'Content-Type'],
                    additionalHeaders: ['X-Requested-With']
                }
            }
            // tls: {
            //     key: readFileSync(`${__dirname}/certs/sword-key.pem`),
            //     cert: readFileSync(`${__dirname}/certs/sword-cert.pem`)
            // }
        });

        await client.register(hapiAuthJwt2);

        client.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_KEY!,
            validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

        client.route(Routes);

        await client.start();

        console.log(`Server running on ${client.info.uri}`);
    } catch (error) {
        console.log(error);
    }
};

process.on('unhandledRejection', error => {
    console.log('SYSTEM ERROR:', error);
    process.exit(1);
});

init();
