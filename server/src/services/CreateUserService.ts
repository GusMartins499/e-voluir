import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../erros/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUser = await usersRepository.findOne({
      where: { email }
    })
    if (checkUser) {
      throw new AppError('User already exists', 401);
    }
    const hashPassword = await hash(password, 8);
    const user = usersRepository.create({ name, email, password: hashPassword })
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService