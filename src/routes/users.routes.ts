import { Request, Response, Router } from 'express';
import CreateUserService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            creat_at: user.create_at,
            update_at: user.update_at,
        };

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default usersRouter;
