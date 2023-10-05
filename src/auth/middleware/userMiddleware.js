const Joi = require("joi");

const validateUserSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  password: Joi.string().min(8).max(20).required(),
});

const validateLoginSchema = Joi.object({
  usernameOrEmail: Joi.alternatives().try(
    Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
    Joi.string().required()
  ),
  password: Joi.string().min(8).max(20).required(),
});

const validateUserMiddleware = (req, res, next) => {
  const { error } = validateUserSchema.validate(req.body);
  if (error)
    res.status(400).send({ error: "validation error", input: error.details });
  next();
};

const validateLoginMiddleware = (req, res, next) => {
  const { error } = validateLoginSchema.validate(req.body);
  if (error)
    res.status(400).send({ error: "validation error", input: error.details });
  next();
};

module.exports = { validateUserMiddleware, validateLoginMiddleware };
