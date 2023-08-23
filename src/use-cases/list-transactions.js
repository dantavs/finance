export class ListTransactions {
    transactionRepository
    constructor (transactionRepository){
        this.transactionRepository = transactionRepository
    }

    async execute(){
        const transactions = await this.transactionRepository.list()
        return transactions
    }
}