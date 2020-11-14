import { Request, Response, Router } from 'express';
import multer from 'multer';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

        return response.json(userWithoutPassword);
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensuredAuthenticated,
    upload.single('file'),
    async (request: Request, response: Response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                creat_at: user.create_at,
                update_at: user.update_at,
            };

            return response.json(userWithoutPassword);
        } catch (err) {
            return response.status(400).json({ erro: err.message });
        }
    },
);

export default usersRouter;
