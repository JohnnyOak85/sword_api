# TO DO

## Steps

1. Define API endpoints. (Done)

2. Implement user authentication. (Done)

3. Implement task creation and retrieval. (Done)

4. Implement task deletion (Done)

5. Implement notifications.

    - Notify manager of each task performed by the tech (This notification can be just a print saying “The tech X performed the task Y on date Z”).
    - This notification should not block any http request.

6. Create unit tests.

7. Create MySQL Database.

8. Integrate with Database (Done..ish)

9. Create a local development environment using docker containing this service and a MySQL database.

10. Use a message broker to decouple notification logic from the application flow. (e.g. RabbitMQ)

    - Use the server.publish() method to notify the manager of each task performed by the technician.
    - Use a Hapi.js plugin such as hapi-rabbit to interact with RabbitMQ.
    - Use the server.subscription() method to subscribe to the messages published to RabbitMQ.

11. Create Kubernetes object files needed to deploy this application.
