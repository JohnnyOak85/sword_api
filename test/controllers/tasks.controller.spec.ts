import { expect } from 'chai';
import { Server } from '@hapi/hapi';
import { stub } from 'sinon';
import { getAllTasks } from '../../src/controllers';
import { init } from '../../src/helpers';
import { Task } from '../../src/interfaces';
import { mockTasks } from '../mocks';

describe('TasksController', () => {
    const findAllTasksStub = stub<Task[]>();
    let app: Server;

    beforeEach(async () => {
        app = await init();
    });

    describe('listTasks', () => {
        it('should return a list of tasks', async () => {
            findAllTasksStub.returns(mockTasks);

            const response = await getAllTasks();

            expect(response).to.equal(mockTasks);
        });
    });
});
