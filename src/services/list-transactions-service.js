import { headers } from "../index.js"
import { databaseSettings } from "../infra/database-settings.js"
import { ListTransactions } from "../use-cases/list-transactions.js"

export async function listTransactionsService(request, response){
    const databaseSetting = new databaseSettings(request)
    const repository = databaseSetting.database()
    
    const listTransactions = new ListTransactions(repository)
    const transactions = await listTransactions.execute()

    response.writeHead(200, headers)
    response.end(JSON.stringify(transactions))
}