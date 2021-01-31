import { Request, Response, Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    return response.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            creat_at: user.create_at,
        }
    });
});

export default sessionsRouter;
