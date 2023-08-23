import { describe, it, before, after }  from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'

const BASE_URL = 'http://localhost:3000'

describe('Create Transaction Service Tests', () => {
    let _server = {}
    before(async () => {
        _server = (await import('../index.js')).app
        await new Promise(resolve => _server.once('listening', resolve))
    })
    after(done => _server.close(done))

    it('should call the Create Transaction Use Case', async () => {
        const data = {name: 'shop', category:'debit', value: 1, testRunner: true}
        const request = await fetch(`${BASE_URL}/createTransaction`, {
            method: 'POST'
            ,body: JSON.stringify(data)
        })

        strictEqual(request.status, 200)
    })
    it('should not allow create a Transaction with missing parameters', async() => {
        const data = {name: 'shop', category:'d', testRunner: true}
        const request =await fetch(`${BASE_URL}/createTransaction`,  {
            method: 'POST'
            ,body: JSON.stringify(data)
        })

        const response = await request.json()

        strictEqual(request.status, 400)
        deepStrictEqual(response, {error: "invalid parameters!"})

    })
})