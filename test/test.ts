import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Server } from '@hapi/hapi';
import { init } from '../src/app';
import { beforeEach, afterEach } from 'node:test';

describe('Server', () => {
    let app: Server;

    beforeEach(async () => {
        app = await init();
    });

    afterEach(async () => {
        await app.stop();
    });

    describe('GET /', () => {
        it('should return 200 status code', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/'
            });

            expect(response.statusCode).to.equal(200);
        });
    });
});
