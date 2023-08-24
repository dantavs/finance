import { InMemoryTransactionsRepository } from '../test/in-memory-transactions-repository.js'

export class databaseSettings{
    repository
    
    constructor(request){
        if (request.headers.testrunner){
            this.repository = new InMemoryTransactionsRepository()
        }
    }

    database(){
        return this.repository
    }
}