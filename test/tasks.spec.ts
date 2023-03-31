import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Server } from '@hapi/hapi';
import { init } from '../src/helpers';
import { Task } from '../src/interfaces';

describe('Server', () => {
    let app: Server;

    beforeEach(async () => {
        app = await init();
    });

    afterEach(async () => {
        await app.stop();
    });

    describe('GET /tasks', () => {
        it('should return 200 status code', async () => {
            const { headers } = await app.inject({
                method: 'PUT',
                url: '/login',
                payload: {
                    username: 'bob',
                    password: 'password456'
                }
            });

            const { result, statusCode } = await app.inject({
                method: 'GET',
                url: '/tasks',
                headers: { authorization: headers.authorization }
            });

            const tasks = [...(result as Array<Task>)];

            expect(statusCode).to.equal(200);
            expect(tasks.length).to.equal(2);
        });

        it('should not allow read function without token', async () => {
            const { statusCode, statusMessage } = await app.inject({
                method: 'GET',
                url: '/tasks'
            });

            expect(statusCode).to.equal(401);
            expect(statusMessage).to.equal('Unauthorized');
        });
    });
});
