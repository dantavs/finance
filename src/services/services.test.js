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

    var _globalID = ""
    it('should call the Create Transaction Use Case', async () => {
        const data = {name: 'shop', category:'debit', value: 1, date: new Date()}
        const request = await fetch(`${BASE_URL}/createTransaction`, {
            method: 'POST'
            ,headers: {
                testrunner: true
            }
            ,body: JSON.stringify(data)
        })

        const response = await request.json()

        _globalID = response.id

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
    it('should return a list with 2 transactions', async () => {
        const request = await fetch(`${BASE_URL}/listTransactions`,{
            method:'GET'
            ,headers: {testrunner: true}
        })

        const response = await request.json()

        strictEqual(request.status, 200)
        deepStrictEqual(response.length, 2)
    })
    it('should throw error when  try Delete a Transaction with the id is not found', async () => {
        const id = crypto.randomUUID()

        const request = await fetch(`${BASE_URL}/deleteTransaction/?id=${id}`, {
            method: 'DELETE'
            ,headers: {
                testrunner: true
            }
        })

        const response = await request.json()

        strictEqual(request.status, 400)
        deepStrictEqual(response, {error: "id not found!"})
    })
    it('should delete a transaction if a valid id is informed', async () => {

        console.log("ID delete test: ", _globalID)

        const request = await fetch(`${BASE_URL}/deleteTransaction/?id=1`, {
            method: 'DELETE'
            ,headers: {
                testrunner: true
            }
        })

        strictEqual(request.status, 201)
    })
})