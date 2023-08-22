import { TransactionsRepository } from "../repositories/transaction-repository.js"


function isIdDuplicated(transactions, id){
    const transaction = transactions.find(
        (item) => item.id == id
        )

    if (!transaction){
        return false
    }

    return true
}

export class InMemoryTransactionsRepository
    extends TransactionsRepository {
    
    transactions = []

    async create (transaction) {
        if (isIdDuplicated(this.transactions, transaction.id)){
            throw new Error('duplicated id!')
        }

        this.transactions.push(transaction)
    }
}