import { InMemoryTransactionsRepository } from '../test/in-memory-transactions-repository.js'
import { PrismaTransactionsRepository } from './prisma-transactions-repository.js'

export class databaseSettings{
    repository
    
    constructor(request){
        if (request.headers.testrunner){
            this.repository = new InMemoryTransactionsRepository()
        }else{
            this.repository = new PrismaTransactionsRepository
        }
    }

    database(){
        return this.repository
    }
}