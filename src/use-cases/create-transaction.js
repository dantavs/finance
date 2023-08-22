import { Transaction } from "../entities/transaction.js"

export class CreateTransaction { 
    transactionRepository
    constructor (transactionRepository){
        this.transactionRepository = transactionRepository
    }

    async execute(data){
        try {
            const transaction = new Transaction(data)
            await this.transactionRepository.create(transaction) 
            return transaction
        } catch (error) {
            throw new Error(error.message)
        }
    }
}