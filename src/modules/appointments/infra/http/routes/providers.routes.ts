import { Request, Response, Router } from 'express';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersCTR from '../controllers/ProvidersCTR';

const providersRouter = Router();

const appointmentsCTR = new ProvidersCTR();

providersRouter.use(ensuredAuthenticated);

providersRouter.get('/', appointmentsCTR.index);

export default providersRouter;
