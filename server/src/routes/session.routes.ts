import { Router } from "express";

import CreateSessionService from "../services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const sessionUser = new CreateSessionService();

  const { user, ngo, token } = await sessionUser.execute({
    email,
    password,
  });

  delete user?.password;
  delete ngo?.senha;

  return response.status(200).json({ user, ngo, token });
});

export default sessionsRouter;
