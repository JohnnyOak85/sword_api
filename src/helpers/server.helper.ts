import { notFound } from '@hapi/boom';
import { server } from '@hapi/hapi';
import { config } from 'dotenv';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { Sequelize } from 'sequelize';
import { Routes } from '../routes';
import { initClasses } from './database.helper';
import { validate } from './validation.helper';

export const init = async () => {
    try {
        const { error } = config({ path: `${__dirname}/../../.env` });

        if (error) {
            throw notFound('Environment file missing.');
        }

        const sequelize = new Sequelize({
            database: process.env.DB_NAME!,
            dialect: 'mysql',
            host: process.env.DB_HOST!,
            password: process.env.DB_PASS!,
            port: Number(process.env.DB_PORT!),
            username: process.env.DB_USER!
        });

        initClasses(sequelize);

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

        return client;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
