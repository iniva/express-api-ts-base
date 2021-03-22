import 'mocha'
import { expect } from 'chai'
import Joi from 'joi'

import { Validator } from '../../../src/utils/Validator'

const schema = Joi.object().keys({
  field: Joi.string().required(),
})

describe('Utils: Validator', () => {
  it('should return default options when using defaultOptions getter', () => {
    const options = Validator.defaultOptions

    expect(options).to.be.instanceof(Object)
    expect(Object.keys(options).length).to.be.greaterThan(1)
  })

  describe('validate()', () => {
    it('should fail when values are not present', () => {
      const { error } = Validator.validate({}, schema)

      expect(error).to.be.instanceof(Error)
      expect(error?.message).to.be.equal('"field" is required')
    })

    it('should fail when receiving invalid values', () => {
      const { error } = Validator.validate({ field: 1234 }, schema)

      expect(error).to.be.instanceof(Error)
      expect(error?.message).to.be.equal('"field" must be a string')
    })

    it('should work when receiving valid values', () => {
      const { value } = Validator.validate({ field: 'string' }, schema)

      expect(typeof value.field).to.be.equal('string')
    })
  })

  describe('parseValidation()', () => {
    it('should return validation details', () => {
      const validation = Validator.validate({ field: 'string' }, schema)
      const parsed = Validator.parseValidation(validation)

      expect(parsed).to.be.instanceof(Object)
      expect(Object.keys(parsed)).to.be.eql(['errors', 'value'])
    })

    it('should return "errors" key undefined when receiving valid data', () => {
      const validation = Validator.validate({ field: 'string' }, schema)
      const parsed = Validator.parseValidation(validation)

      expect(parsed.errors).to.be.empty
    })

    it('should return "errors" key with details when receiving invalid data', () => {
      const validation = Validator.validate({ field: 1234 }, schema)
      const parsed = Validator.parseValidation(validation)

      expect(parsed.errors[0]).to.be.eql({ field: '"field" must be a string' })
    })
  })

  describe('toResponse()', () => {
    it('should return a Boom formatted error', () => {
      const validation = Validator.validate({ field: 1234 }, schema)
      const parsed = Validator.parseValidation(validation)
      const response = Validator.toResponse(parsed.errors)
      const { payload } = response.output

      expect(response).to.be.instanceof(Error)
      expect(response.isBoom).to.be.true
      expect(payload.error).to.be.equal('Bad Request')
      expect(payload.message).to.be.equal('Validation Errors')
      expect(payload.statusCode).to.be.equal(400)
      expect(payload.errors).to.be.instanceof(Array)
    })
  })
})
