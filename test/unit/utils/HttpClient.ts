import 'mocha'
import { expect } from 'chai'

import config from '../../../src/config'
import { HttpClient } from '../../../src/utils/HttpClient'

describe('Utils: HttpClient', () => {
  it('should create an instance with defaults', async () => {
    const httpClient = new HttpClient()
    const userAgent = httpClient.instance.defaults.options.headers['user-agent']

    expect(httpClient).to.be.instanceof(HttpClient)
    expect(httpClient.instance).to.be.instanceof(Function)

    expect(userAgent).to.be.equal(config.userAgent)
  })

  it('should create an instance with custom settings', async () => {
    const customUA = 'Custom UA'
    const httpClient = new HttpClient({
      headers: {
        'user-agent': customUA
      }
    })
    const userAgent = httpClient.instance.defaults.options.headers['user-agent']

    expect(httpClient).to.be.instanceof(HttpClient)
    expect(httpClient.instance).to.be.instanceof(Function)

    expect(userAgent).to.be.equal(customUA)
  })
})
