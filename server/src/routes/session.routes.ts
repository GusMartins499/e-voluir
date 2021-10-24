import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionUser = new CreateSessionService();

    const { user, token } = await sessionUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(200).json({ user, token });

  } catch (error) {
    console.log('error ', error);
    return response.status(500).json({ message: error.message })
  }
});

export default sessionsRouter;