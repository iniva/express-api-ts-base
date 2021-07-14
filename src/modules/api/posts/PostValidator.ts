import { Validator, ValidatorResult } from '@utils/Validator'
import { PostSchema } from './PostSchema'

export class PostValidator extends Validator {
  static create(params: unknown): ValidatorResult {
    const validation = this.validate(params, PostSchema.create())

    return this.parseValidation(validation)
  }

  static update(params: unknown): ValidatorResult {
    const validation = this.validate(params, PostSchema.update())

    return this.parseValidation(validation)
  }
}
