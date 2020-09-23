 import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import {getCustomRepository, getRepository} from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request{
  title:string;
  type: 'income'|'outcome';
  value:number;
  category:string;
}

class CreateTransactionService {
  public async execute({title,value,type,category}: Request): Promise<Transaction> {
    // TODO

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const balance =  await transactionRepository.getBalance();
    const totalBalance = balance.total;

    if (type==='outcome'&&value>totalBalance){
      throw new AppError("Saldo insuficiente!");
    }
    let categoryId = await categoryRepository.findOne({
      where:  {title:category,},
    });

    if (!categoryId){
      categoryId = categoryRepository.create({
        title:category,
      });

      await categoryRepository.save(categoryId);
    }
    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category:categoryId,
    })

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
