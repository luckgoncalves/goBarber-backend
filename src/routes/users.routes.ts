import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface UserCreate {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: UserCreate = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.send(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return true;
  }
});

export default usersRouter;
