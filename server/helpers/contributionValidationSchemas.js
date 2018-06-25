import Joi from 'joi';


module.exports = {
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
    }),

    contributionCreateUpdateSchema: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.date().iso().required(),
      location: Joi.string(),
      address: Joi.string(),
      images: Joi.array().items(Joi.string()),
      coverImage: Joi.number()
    }),

  }
}