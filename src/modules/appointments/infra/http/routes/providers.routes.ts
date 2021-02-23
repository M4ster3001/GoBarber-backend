import { Request, Response, Router } from 'express';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersCTR from '../controllers/ProvidersCTR';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityCTR';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityCTR';

const providersRouter = Router();

const appointmentsCTR = new ProvidersCTR();
const providerMonthAvailabilityCTR = new ProviderMonthAvailabilityController();
const providerDayAvailabilityCTR = new ProviderDayAvailabilityController();

providersRouter.use(ensuredAuthenticated);

providersRouter.get('/', appointmentsCTR.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityCTR.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityCTR.index,
);

export default providersRouter;
