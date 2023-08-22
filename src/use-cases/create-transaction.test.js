import { describe, it } from "node:test"
import { fail, strictEqual } from 'node:assert'
import { createTransaction } from "./create-transaction.js"
import { InMemoryTransactionsRepository } from "../test/in-memory-transactions-repository.js"

describe('Create Transaction tests', () => {
    it('should created a transaction and receive its content', async () => {
        const transactionRepository = new InMemoryTransactionsRepository()

        const data = {
            name: 'shop'
            ,category: 'debit'
            ,value: 3.2
        }

        const transaction = new createTransaction(transactionRepository)
        await transaction.execute(data)
        
    })
    it('should not allow to create a transaction with invalid parameter',async () => {
        const transactiosRepository = new InMemoryTransactionsRepository()

        const data = {
            
        }
        const transaction = new createTransaction(transactiosRepository)
        try {
            await transaction.execute(data)
            fail('it should throw an error')
        } catch (error) {
            strictEqual(error.message, 'invalid parameters!')
        }
    })
    it('should not allow to create a transaction with duplicated ID', async () => {
        const transactionRepository = new InMemoryTransactionsRepository()

        const data = {
            id: crypto.randomUUID()
            ,name: 'shop'
            ,category: 'debit'
            ,value: 2
        }

        const transaction = new createTransaction(transactionRepository)
        await transaction.execute(data)

        try {
            await transaction.execute(data)
            fail('it should throw an error')
        } catch (error) {
            strictEqual(error.message, 'duplicated id!')
        }

    })
})