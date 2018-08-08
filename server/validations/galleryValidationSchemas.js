import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  galleryCreateUpdateSchema: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    location: Joi.string().allow(''),
    type: Joi.string().required(),
    date: Joi.date().iso().required(),
    images: Joi.array().items(Joi.string().uri()),
    coverImage: Joi.string().uri().allow(''),
  }),
};