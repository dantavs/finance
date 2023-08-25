import { prisma } from '../../src/index.js'
import { TransactionsRepository } from '../repositories/transaction-repository.js';

export class PrismaTransactionsRepository 
extends TransactionsRepository{
    
    async create(transaction){
        console.log('Transaction: ', transaction)
        await prisma.transactions.create({
            data: transaction
        })
    }

    async list(){
        return prisma.transactions.findMany()
    }
}