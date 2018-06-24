import Joi from 'joi';


module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({param: req.params[name]}, schema)
      if (result.error) {
        return res.status(422).json(result.error);
      } else {
        if (!req.value)
          req.value = {};
        if (!req.value.params)
          req.value.params = {};
        req.value.params[name] = result.value.param;
        next();
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error) {
        return res.status(422).json({error: result.error.details[0].message});
      } else {
        if (!req.value)
          req.value = {};
        if (!req.value.body)
          req.value.body = {};
        req.value.body = result.value;
        next();
      }
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    contributionCreateUpdateSchema: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.date().iso().required(),
      location: Joi.string(),
      address: Joi.string(),
      images: Joi.array().items(Joi.string()),
      coverImage: Joi.number()
    }),

    contributionDeleteSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })

  }
}