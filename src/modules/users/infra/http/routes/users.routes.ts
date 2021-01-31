import { Request, Response, Router } from 'express';
import multer from 'multer';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '@modules/users/services/CreateUsersService';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    console.log(request.body)
    const createUser = container.resolve(CreateUserService);

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
});

usersRouter.patch(
    '/avatar',
    ensuredAuthenticated,
    upload.single('file'),
    async (request: Request, response: Response) => {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

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
    },
);

export default usersRouter;
