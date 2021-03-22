import 'mocha'
import { expect } from 'chai'

import { ObjectHelper } from '../../../src/utils/ObjectHelper'

describe('Utils: ObjectHelper', () => {
  describe('has:', () => {
    it('should return false when the property does not exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      }

      expect(ObjectHelper.has(object, 'age')).to.be.false
    })

    it('should return true when the property exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      }

      expect(ObjectHelper.has(object, 'lastName')).to.be.true
    })
  })
})
