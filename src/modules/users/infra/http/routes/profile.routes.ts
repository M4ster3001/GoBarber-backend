import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileCTR from '../controllers/ProfileCTR';

const profileRouter = Router();
const profileCTR = new ProfileCTR();

profileRouter.use(ensuredAuthenticated);

profileRouter.get('/', profileCTR.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileCTR.update,
);

export default profileRouter;
