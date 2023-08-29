export class DeleteTransaction {
   transactionRepository
   constructor(repository){this.transactionRepository = repository}
   
   async execute(id){
       try {
            await this.transactionRepository.delete(id)
            return true
            
        } catch (error) {
            throw new Error(error.message)
        }
   }
}