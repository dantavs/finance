import { InMemoryTransactionsRepository } from "../test/in-memory-transactions-repository.js"
import { ListTransactions } from "../use-cases/list-transactions.js"

export async function listTransactionsService(request, response){
    var transactionRepository = ''
    
    /* if (request.headers.testRunner){
    } */
    transactionRepository = new InMemoryTransactionsRepository()
    
    const listTransactions = new ListTransactions(transactionRepository)
    const transactions = await listTransactions.execute()

    response.end(JSON.stringify(transactions))
}