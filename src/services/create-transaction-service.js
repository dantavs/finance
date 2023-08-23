import { Transaction } from "../entities/transaction.js"
import { InMemoryTransactionsRepository } from "../test/in-memory-transactions-repository.js"
import { CreateTransaction } from "../use-cases/create-transaction.js"
import { once } from 'node:events'

function transactionCreated(repository, data){
    const transation = new Transaction(data)
    const createTransaction = new CreateTransaction(repository)
    createTransaction.execute(transation)
}

export async function createTransactionService(request, response){
    
    const { name, category, value, testRunner } = JSON.parse(await once(request, 'data'))
    var repository
    
    if (testRunner){
        repository = new InMemoryTransactionsRepository()
    }
    
    const data = {
        name: name
        ,category: category
        ,value: value
    }

    try {
        const x = transactionCreated(repository, data)
    } catch (error) {
        response.writeHead(400)
        response.end(JSON.stringify({ error: error.message}))
        return
    }
    
    response.end(JSON.stringify({message: "Create Transaction"}))
}

