import { describe, it, before, after } from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'

const BASE_URL = 'http://localhost:3000'

describe('List Transactions Service tests', async () => {
    let _server = {}
    before(async () => {
        _server = (await import('../index.js')).app
        await new Promise(resolve => _server.once('listening', resolve))
    })
    after(async done => await _server.close(done))

    await it('should return an empty list of transactions', async () => {
        const data = {testRunner: true}
        const request = await fetch(`${BASE_URL}/listTransactions`, {
            method: 'GET'
            ,headers: {
                testRunner: true
            }
        })

       strictEqual(request.status,200)

    })
})