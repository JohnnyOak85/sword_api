import Joi from 'joi';

export const TaskSchema = Joi.object().keys({
    summary: Joi.string().max(2500).required().description('Summary of the task.'),
    performed: Joi.boolean().description('If the task has been performed or not.')
});
