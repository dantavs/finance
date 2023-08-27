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

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

const app = createServer(handler)
.listen(3000, () => console.log('listening at 3000'))

export{app, headers}