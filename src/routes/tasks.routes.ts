import { Request, ResponseToolkit } from '@hapi/hapi';
import { createTask, deleteTask, getTasks, updateTask } from '../helpers';
import { TaskData, UserRole } from '../interfaces';
import { TaskSchema } from '../schemas';

export const TaskRoutes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const { id, role } = request.auth.credentials as { id: string; role: UserRole };

                return h.response(getTasks(id, role));
            } catch (error) {
                throw error;
            }
        },
        options: {
            auth: { strategy: 'jwt' }
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const { id } = request.auth.credentials as { id: string; role: UserRole };

                return h.response(createTask(id, request.payload as TaskData));
            } catch (error) {
                throw error;
            }
        },
        options: {
            auth: { strategy: 'jwt', access: { scope: 'technician' } },
            validate: { payload: TaskSchema }
        }
    },
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const { id } = request.auth.credentials as { id: string; role: UserRole };

                return h.response(updateTask(id, request.params.id, request.payload as TaskData));
            } catch (error) {
                throw error;
            }
        },
        options: {
            auth: { strategy: 'jwt', access: { scope: 'technician' } },
            validate: { payload: TaskSchema }
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                return h.response(deleteTask(request.params.id));
            } catch (error) {
                throw error;
            }
        },
        options: {
            auth: { strategy: 'jwt', access: { scope: 'manager' } }
        }
    }
];
