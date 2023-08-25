import { createServer } from 'node:http'
import { createTransactionService } from './services/create-transaction-service.js'
import { listTransactionsService } from './services/list-transactions-service.js'
import { PrismaClient } from '@prisma/client'


async function handler(request, response){
    
    
    if (request.url == "/createTransaction" && request.method == 'POST'){
        return await createTransactionService(request, response)
    }
    if (request.url == "/listTransactions"){
        return await listTransactionsService(request, response)
    }
    response.end("Hello world!")
}

export const prisma = new PrismaClient()

const transactions = await prisma.transactions.count()

console.log('transactions: ', transactions)

const app = createServer(handler)
.listen(3000, () => console.log('listening at 3000'))

export{app}