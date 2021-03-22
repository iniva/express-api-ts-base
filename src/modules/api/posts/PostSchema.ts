import Joi from 'joi'

class PostSchema {
  static create(): Joi.ObjectSchema {
    return Joi.object().keys({
      title: Joi.string()
        .min(5)
        .required()
    })
  }
}

export { PostSchema }
