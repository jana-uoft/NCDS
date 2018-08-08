import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  messageCreateUpdateSchema: Joi.object().keys({
    date: Joi.date().iso().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().allow(''),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().required()
  }),
};