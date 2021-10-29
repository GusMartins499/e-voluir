import { Router } from "express";

import CreateSessionService from "../services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const sessionUser = new CreateSessionService();

  const { user, token } = await sessionUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});

export default sessionsRouter;
