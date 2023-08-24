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
    
    transactions = [
        {id: 1, name:'transaction 1', category: 'debit', value:1}
        ,{id: 2, name:'transaction 2', category: 'debit', value: 2}
    ]

    async create (transaction) {
        if (isIdDuplicated(this.transactions, transaction.id)){
            throw new Error('duplicated id!')
        }

        this.transactions.push(transaction)
    }

    async list () {
        return this.transactions
    }
}