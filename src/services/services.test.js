import { describe, it, before, after }  from 'node:test'
import { strictEqual, deepStrictEqual } from 'node:assert'

const BASE_URL = 'http://localhost:3000'

describe('Services Test Suite', () => {
    let _server = {}
    before(async () => {
        _server = (await import('../index.js')).app
        await new Promise(resolve => _server.once('listening', resolve))
    })
    after( done =>  _server.close(done))


    it('should call the Create Transaction Use Case', async () => {
        const data = {name: 'shop', category:'debit', value: 1}
        const request = await fetch(`${BASE_URL}/createTransaction`, {
            method: 'POST'
            ,headers: {
                testrunner: true
            }
            ,body: JSON.stringify(data)
        })

        strictEqual(request.status, 200)
    })
    it('should not allow create a Transaction with missing parameters', async() => {
        const data = {name: 'shop', category:'d'}
        const request =await fetch(`${BASE_URL}/createTransaction`,  {
            method: 'POST'
            ,body: JSON.stringify(data)
            ,headers: {
                testrunner: true
            }
        })

        const response = await request.json()

        strictEqual(request.status, 400)
        deepStrictEqual(response, {error: "invalid parameters!"})

    })
    it('should return an empty list of transactions', async () => {
        const request = await fetch(`${BASE_URL}/listTransactions`, {
            method: 'GET'
            ,headers: {
                testrunner: true
            }
        })

        const response = await request.json()

       strictEqual(request.status,200)
       deepStrictEqual(response, [])

    })
    it('should return a list with 2 transactions', async () => {
        const tr1 = {name: 'transaction 1',category: 'debit', value: 1.1}
        const tr2 = {name: 'transaction 2',category: 'debit', value: 1.2}

        await fetch(`${BASE_URL}/createTransaction`, {
            method: 'POST'
            ,headers: {testrunner: true}
            ,body: JSON.stringify(tr1)
        })

        await fetch(`${BASE_URL}/createTransaction`, {
            method: 'POST'
            ,headers: {testrunner: true}
            ,body: JSON.stringify(tr2)
        })

        const request = await fetch(`${BASE_URL}/listTransactions`,{
            method:'GET'
            ,headers: {testrunner: true}
        })

        const response = await request.json()

        strictEqual(request.status, 200)
        deepStrictEqual(response.length, 2)
    })
})