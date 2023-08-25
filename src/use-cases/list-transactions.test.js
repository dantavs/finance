import { describe, it } from 'node:test'
import { strictEqual } from 'node:assert'
import { InMemoryTransactionsRepository } from '../test/in-memory-transactions-repository.js'
import { ListTransactions } from './list-transactions.js'
import { CreateTransaction } from './create-transaction.js'

describe('List Transaction Use Case tests', () => {
    it('should return an empty transactions list', async () => {
        const inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
        const listTransactions = new ListTransactions(inMemoryTransactionsRepository)
        const transactions = await listTransactions.execute()
        
        strictEqual(transactions.length, 2)
    })

    it('should return transaction list items', async () => {
        const inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
        
        const data = {
            name: 'shop'
            ,category: 'debit'
            ,value: 4.1
            ,date: new Date()
        }

        const transaction = new CreateTransaction(inMemoryTransactionsRepository)
        await transaction.execute(data)

        const listTransactions = new ListTransactions(inMemoryTransactionsRepository)
        const transactions = await listTransactions.execute()

        strictEqual(transactions.length, 3)
    })
})