import Joi from 'joi';
import {} from '@hapi/boom';
export const CredentialsSchema = Joi.object().keys({
    password: Joi.string().required().description('Password of the user trying to login.'),
    username: Joi.string().required().description('Identification of the user trying to login.')
});
