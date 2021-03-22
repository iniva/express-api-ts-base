import 'mocha'
import { expect } from 'chai'

import { LoggerFactory } from '../../../src/utils/LoggerFactory'

describe('Utils: Logger', () => {
  beforeEach(() => {
    process.env.APP_NAME = 'Test App'
  })

  it('should return a new logger if created without identifier', () => {
    const logger = LoggerFactory.create()

    expect(logger).to.be.ok
  })

  it('should return a new logger if created with identifier', () => {
    const logger = LoggerFactory.create('custom')

    expect(logger).to.be.ok
  })
})
