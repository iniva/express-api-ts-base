import { Validator, ValidatorResult } from '@utils/Validator'
import { PostSchema } from './PostSchema'

class PostValidator extends Validator {
  static create(params: unknown): ValidatorResult {
    const validation = this.validate(params, PostSchema.create())

    return this.parseValidation(validation)
  }
}

export { PostValidator }
