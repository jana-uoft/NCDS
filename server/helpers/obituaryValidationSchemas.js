import Joi from 'joi';


module.exports = {
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
    }),

    obituaryCreateUpdateSchema: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      birthDate: Joi.date().iso().required(),
      deathDate: Joi.date().iso().required(),
      viewingDate: Joi.date().iso().required(),
      startTime: Joi.date().timestamp().required(),
      endTime: Joi.date().timestamp().required(),
      location: Joi.string(),
      address: Joi.string(),
      coverImage: Joi.string().uri(),
      contactName: Joi.string().required(),
      contactNumber: Joi.string().required(),
      location: Joi.string(),
      address: Joi.string()
    }),

  }
}