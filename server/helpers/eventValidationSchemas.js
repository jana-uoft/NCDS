import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  eventCreateUpdateSchema: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().iso().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
    location: Joi.string().allow(''),
    address: Joi.string().allow(''),
    coverImage: Joi.string().uri().allow(''),
    contactName: Joi.string().required(),
    contactNumber: Joi.string().required(),
  }),
};