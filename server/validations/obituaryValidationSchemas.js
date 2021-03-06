import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  obituaryCreateUpdateSchema: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    birthDate: Joi.date().iso().allow(null),
    deathDate: Joi.date().iso().allow(null),
    expiryDate: Joi.date().iso().required(),
    coverImage: Joi.string().uri().allow(''),
    contactName: Joi.string().allow(''),
    contactNumber: Joi.string().allow(''),
    createdAt: Joi.date().iso().allow(null),
    updatedAt: Joi.date().iso().allow(null)
  }),
};