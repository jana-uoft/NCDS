import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  newsCreateUpdateSchema: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().required().uri(),
    rss: Joi.string().uri().allow(''),
    category: Joi.string().required()
  }),
};