import { Router } from 'express';
import multer from 'multer';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersCTR from '../controllers/UsersCTR';
import UserAvatarCTR from '../controllers/UserAvatarCTR';

const upload = multer(uploadConfig);

const usersRouter = Router();

const usersCTR =  new UsersCTR();
const userAvatarCTR = new UserAvatarCTR();

usersRouter.post('/', usersCTR.create);
usersRouter.patch(
    '/avatar',
    ensuredAuthenticated,
    upload.single('file'),
    userAvatarCTR.update
);

export default usersRouter;
