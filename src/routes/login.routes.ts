import { Request, ResponseToolkit } from '@hapi/hapi';
import { login } from '../helpers';
import { UserCredentials } from '../interfaces';
import { CredentialsSchema } from '../schemas';

export const LoginRoutes = [
    {
        method: 'PUT',
        path: '/login',
        handler: async (request: Request, h: ResponseToolkit) => {
            const token = await login(request.payload as UserCredentials);

            return h.response('OK').header('Authorization', `Bearer ${token}`);
        },
        options: {
            validate: { payload: CredentialsSchema }
        }
    }
];
