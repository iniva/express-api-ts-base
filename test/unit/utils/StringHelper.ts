import 'mocha'
import { expect } from 'chai'

import { StringHelper } from '../../../src/utils/StringHelper'

describe('Utils: StringHelper', () => {
  it('should return a slugged version of a string', () => {
    const resultText = StringHelper.slug('the title is clear')

    expect(resultText).to.be.equal('the-title-is-clear')
  })

  it('should return a capitalized version of a string', () => {
    const resultText = StringHelper.capitalize('the title is clear')

    expect(resultText).to.be.equal('The title is clear')
  })

  it('should return a camelized version of a single word string', () => {
    const normalWord = StringHelper.camelize('greenhouse')
    const accentedWord = StringHelper.camelize('árbol')

    expect(normalWord).to.be.equal('Greenhouse')
    expect(accentedWord).to.be.equal('Árbol')
  })

  it('should return a camelized version of a multiple word string', () => {
    const normalString = StringHelper.camelize('the title is clear')
    const accentedString = StringHelper.camelize('el árbol es único')

    expect(normalString).to.be.equal('The Title Is Clear')
    expect(accentedString).to.be.equal('El Árbol Es Único')
  })
})
