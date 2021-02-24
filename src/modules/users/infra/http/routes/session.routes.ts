import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionCTR from '../controllers/SessionsCTR';

const sessionsRouter = Router();

const sessionCTR = new SessionCTR();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionCTR.create,
);

export default sessionsRouter;
