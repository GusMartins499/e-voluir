import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../erros/AppError';

import User from '../models/User';
import NGO from '../models/Ngo';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  ngo: NGO;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const ngoRepository = getRepository(NGO);

    const user = await userRepository.findOne({ where: { email } });
    const ngo = await ngoRepository.findOne({where: { email }});

    if (!user) {
      if(!ngo) {
        throw new AppError('Incorrect email/password combination', 401);
      }
    }
    let userPasswordMatch;
    let ngoPasswordMatch;
    if (user) {
      userPasswordMatch = await compare(password, user.password);
    }
    if (ngo) {
      ngoPasswordMatch = await compare(password, ngo.senha);
    }

    if (!userPasswordMatch) {
      if (!ngoPasswordMatch) {
        throw new AppError('Incorrect email/password combination', 401);
      }
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user ? user.id : ngo.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, ngo, token };

  }
}

export default CreateSessionService;
