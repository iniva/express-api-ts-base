import { badRequest, Boom } from '@hapi/boom'
import { Schema, ValidationResult, ValidationOptions } from 'joi'

type ValidatorDefaultOptions = {
  abortEarly: boolean
  allowUnknown: boolean
  convert: boolean
}

type ValidatorResult = {
  errors: {
    [error_path: string]: string
  }[]
  value: unknown
}

class Validator {
  private static DEFAULT_OPTIONS: ValidatorDefaultOptions = {
    abortEarly: false,
    allowUnknown: true,
    convert: false
  }

  static get defaultOptions(): ValidatorDefaultOptions {
    return this.DEFAULT_OPTIONS
  }

  static validate(values: unknown, schema: Schema, options: ValidationOptions = {}): ValidationResult {
    const fullOptions = {
      ...this.DEFAULT_OPTIONS,
      ...options
    }

    return schema.validate(values, fullOptions)
  }

  static parseValidation(validation: ValidationResult): ValidatorResult {
    const errors: ValidatorResult['errors'] = []

    if (validation.error) {
      for (const error of validation.error.details) {
        errors.push({
          [error.path[0]]: error.message
        })
      }
    }

    return {
      errors,
      value: validation.value
    }
  }

  static toResponse(errors: ValidatorResult['errors']): Boom<any> {
    const errorResponse = badRequest('Validation Errors', errors)

    errorResponse.output.payload.errors = errorResponse.data

    return errorResponse
  }
}

export { Validator, ValidatorResult }
