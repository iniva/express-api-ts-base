import Joi from 'joi'

export class PostSchema {
  static create(): Joi.ObjectSchema {
    return Joi.object().keys({
      title: Joi.string()
        .min(2)
        .required(),

      content: Joi.string()
        .min(2)
        .required(),

      author: Joi.string()
        .min(2)
        .required()
    })
  }

  static update(): Joi.ObjectSchema {
    return Joi.object().keys({
      title: Joi.string()
        .min(2),

      content: Joi.string()
        .min(2),

      author: Joi.string()
        .min(2),

      published: Joi.boolean()
    })
  }
}
