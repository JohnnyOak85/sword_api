import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { Server } from '@hapi/hapi';
import { init } from '../src/helpers';

describe('Login', () => {
    let app: Server;

    beforeEach(async () => {
        app = await init();
    });

    afterEach(async () => {
        await app.stop();
    });

    describe('PUT /login', () => {
        it('should login', async () => {
            const { headers, payload, statusCode } = await app.inject({
                method: 'PUT',
                url: '/login',
                payload: {
                    username: 'alice',
                    password: 'password123'
                }
            });

            expect(statusCode).to.equal(200);
            expect(payload).to.equal('OK');
            expect(headers).haveOwnProperty('authorization');
        });

        it('Should not login with wrong username', async () => {
            const { statusCode, statusMessage } = await app.inject({
                method: 'PUT',
                url: '/login',
                payload: { username: 'wronguser', password: 'password123' }
            });

            expect(statusCode).to.equal(401);
            expect(statusMessage).to.equal('Unauthorized');
        });

        it('Should not login with wrong password', async () => {
            const { statusCode, statusMessage } = await app.inject({
                method: 'PUT',
                url: '/login',
                payload: { username: 'alice', password: 'wrongpass' }
            });

            expect(statusCode).to.equal(401);
            expect(statusMessage).to.equal('Unauthorized');
        });

        it('Should not login with invalid payload', async () => {
            const { statusCode, statusMessage } = await app.inject({
                method: 'PUT',
                url: '/login',
                payload: { id: '4', password: 'wrongpass' }
            });

            expect(statusCode).to.equal(400);
            expect(statusMessage).to.equal('Bad Request');
        });
    });
});
