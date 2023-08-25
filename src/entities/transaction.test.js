import { describe, it } from 'node:test'
import { strictEqual, fail} from 'node:assert'
import { Transaction } from './transaction.js'


describe('Transaction entity testing',() => {
    it('should create a new transaction', () => {
        const data = {
            name : "john"
            , category : "debit"
            , value: 1.00
            , date: new Date()
        }

        try {
            const transaction = new Transaction(data)
            strictEqual(transaction.name, data.name)
        } catch (error) {
            fail(error.message)
        }
    })    
    it('should throw Error if the name is not informed', () => {
        
        const data = {
            name : ""
            ,category: "debit"
            ,value: 1.00
        }

        try {
            const transaction = new Transaction(data)
            fail("This should throw an error")
        } catch (error) {
            strictEqual(error.message, "invalid parameters!")
        }
        
    })      
    it('should throw Error if a wrong category is informed', () => {
        const data = {
            name : "john"
            ,category: "value"
            ,value:1.00
        }
        try {
            const transaction = new Transaction(data)
            fail("This should throw an error")
        } catch (error) {
            strictEqual(error.message, "invalid parameters!")
        }
    })    
    it('should throw Error if the value is not a number', () => {
        const data = {
            name : "john"
            ,category: "debit"
            ,value:"aa"
        }
        try {
            const transaction = new Transaction(data)
            fail("This should throw an error")
        } catch (error) {
            strictEqual(error.message, "invalid parameters!")
        }
    })    
    it('should throw Error if the date is not a date',() => {
        const data = {
            name: 'transaction 1'
            ,category: 'debit'
            ,value: 1.2
            ,date: 'a'
        }
        try {
            const transaction = new Transaction(data)
            fail('This should throw an error')
        } catch (error) {
            strictEqual(error.message, "invalid parameters!")
        }
    })
})