import { it, describe } from 'node:test'
import { deepStrictEqual, fail, ok } from 'node:assert'
import { InMemoryTransactionsRepository } from '../test/in-memory-transactions-repository.js'
import { DeleteTransaction } from './delete-transaction.js'

describe('Delete Transaction Use Case test suite', () => {
    it('should throw error when an transaction id is not found', async () => {
        const inMemoryTransactionRepository = new InMemoryTransactionsRepository()
        const id ='10'

        const deleteTransaction = new DeleteTransaction(inMemoryTransactionRepository)
        
        try {
            await deleteTransaction.execute(id)
            fail('This test should throw an error')
        } catch (error) {
            deepStrictEqual(error.message, "id not found!")
        }
        
    })
    it('should delete a transaction with a valid id', async () => {
        const inMemoryTransactionRepository = new InMemoryTransactionsRepository()
        const id ='1'

        const deleteTransaction = new DeleteTransaction(inMemoryTransactionRepository)
        
        try {
            await deleteTransaction.execute(id)
            ok('test passed')
        } catch (error) {
            fail('This test should throw an error')
        }        
    })
})