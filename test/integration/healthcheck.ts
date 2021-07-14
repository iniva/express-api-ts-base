import 'mocha'
import { expect } from 'chai'

import api from './helpers/api'

describe('Health check', () => {
  it('should answer with status code 200', async () => {
    const response = await api.get('/health')

    expect(response.status).to.equal(200)
  })
})
