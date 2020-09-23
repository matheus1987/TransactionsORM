 import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import {getCustomRepository} from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request{
  id:string;
}

class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne(id);

    if (!transaction){
      throw new AppError("Transaction does not exists");
    }

    await transactionRepository.remove(transaction);
    //transactionRepository.
 
  }
}

export default DeleteTransactionService;
