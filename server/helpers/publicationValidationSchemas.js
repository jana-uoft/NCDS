import Joi from 'joi';


module.exports = {
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
    }),

    publicationCreateUpdateSchema: Joi.object().keys({
      date: Joi.date().iso().required(),
      images: Joi.array().items(Joi.string()),
      coverImage: Joi.number()
    }),

  }
}