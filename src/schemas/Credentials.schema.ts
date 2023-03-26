import Joi from 'joi';

export const CredentialsSchema = Joi.object().keys({
    id: Joi.string().required().description('Identification of the user trying to login.'),
    password: Joi.string().required().description('Password of the user trying to login.')
});
