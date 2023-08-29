import { headers } from "../index.js"
import { databaseSettings } from "../infra/database-settings.js"
import { DeleteTransaction } from '../use-cases/delete-transaction.js'

export async function deleteTransactionService(request, response){

    const databaseSetting = new databaseSettings(request)
    const repository = databaseSetting.database()

    const id = new URL(request.url, "http://localhost:3000").searchParams.get("id")

    const deleteTransaction = new DeleteTransaction(repository)

    try {
        await deleteTransaction.execute(id)
    } catch (error) {
        response.writeHead(400, headers)
        response.end(JSON.stringify({ error: error.message}))
        return
    }

    response.writeHead(201, headers)
    response.end('')
    return true
}