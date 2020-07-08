import { Router } from 'express';

import CreateUserService from './../services/CreateUserService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const creataUser = new CreateUserService();

    const user = await creataUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default appointmentsRouter
