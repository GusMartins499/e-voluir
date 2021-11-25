import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing')
  }

  const [type, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.userOrNgo = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token')
  }

}