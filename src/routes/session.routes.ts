import { Request, Response, Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({
            token,
            id: user.id,
            email: user.email,
            name: user.name,
            creat_at: user.create_at,
        });
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default sessionsRouter;
