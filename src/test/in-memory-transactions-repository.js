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
        {id: '1', name:'transaction 1', category: 'debit', value:1, date: "2023-08-01"}
        ,{id: '2', name:'transaction 2', category: 'debit', value: 2, date: "2023-08-01"}
    ]

    async create (transaction) {
        if (isIdDuplicated(this.transactions, transaction.id)){
            throw new Error('duplicated id!')
        }

        const transactionStr = {
            id: transaction.id
            ,name: transaction.name
            ,category: transaction.category
            ,value: transaction.value
            ,date: transaction.date
        }

        this.transactions.push(transactionStr)
    }

    async list () {
        return this.transactions
    }

    async delete (id){
        const transaction = this.transactions.find( (transaction) => transaction.id === id )

        if (!transaction){
            throw new Error ("id not found!")
        }else{
            const i = this.transactions.indexOf(transaction)
            this.transactions.splice(i,1)
        }

        return true
    }
}