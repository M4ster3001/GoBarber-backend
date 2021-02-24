import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

import UsersCTR from '../controllers/UsersCTR';
import UserAvatarCTR from '../controllers/UserAvatarCTR';

const upload = multer(uploadConfig);

const usersRouter = Router();

const usersCTR = new UsersCTR();
const userAvatarCTR = new UserAvatarCTR();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersCTR.create,
);
usersRouter.patch(
  '/avatar',
  ensuredAuthenticated,
  upload.single('file'),
  userAvatarCTR.update,
);

export default usersRouter;
