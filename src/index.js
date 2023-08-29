import { createServer } from 'node:http'
import { PrismaClient } from '@prisma/client'
import { createTransactionService } from './services/create-transaction-service.js'
import { listTransactionsService } from './services/list-transactions-service.js'
import { deleteTransactionService } from './services/delete-transaction-service.js'

async function handler(request, response){

    const url = new URL(request.url, "http://localhost:3000")
    const path = url.pathname

    if (path == "/createTransaction" && request.method == 'POST'){
        return await createTransactionService(request, response)
    }
    if (path == "/listTransactions"){
        return await listTransactionsService(request, response)
    }

    if (path == "/deleteTransaction/" && request.method == 'DELETE'){
        return await deleteTransactionService(request, response)
    }

    response.writeHead(404, headers)
    response.end("Path doesn't exist!")
}

export const prisma = new PrismaClient()

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, DELETE",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

const app = createServer(handler)
.listen(3000, () => console.log('listening at 3000'))

export{app, headers}