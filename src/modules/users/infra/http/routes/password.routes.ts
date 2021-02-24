import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordCTR from '../controllers/ForgotPasswordCTR';
import ResetPasswordCTR from '../controllers/ResetPasswordCTR';

const passwordRouter = Router();

const forgotPasswordCTR = new ForgotPasswordCTR();
const resetPasswordCTR = new ResetPasswordCTR();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordCTR.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
