import { Transaction } from "../entities/transaction.js"
import { headers } from "../index.js"
import { databaseSettings } from "../infra/database-settings.js"
import { CreateTransaction } from "../use-cases/create-transaction.js"
import { once } from 'node:events'

async function transactionCreated(repository, data){
    const transaction = new Transaction(data)
    const createTransaction = new CreateTransaction(repository)
    await createTransaction.execute(transaction)

    return transaction
}

export async function createTransactionService(request, response){
    const databaseSetting = new databaseSettings(request)
    const repository = databaseSetting.database()
    let transaction = ""

    const { name, category, value, date} = JSON.parse(await once(request, 'data'))
    
    const data = {
        name: name
        ,category: category
        ,value: value
        ,date: date
    }

    try {
        transaction = await transactionCreated(repository, data)
    } catch (error) {
        response.writeHead(400, headers)
        response.end(JSON.stringify({ error: error.message}))
        return
    }

    response.writeHead(200, headers)
    response.end(JSON.stringify(transaction))
}

