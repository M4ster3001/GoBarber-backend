import { Request, Response, Router } from 'express';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityCTR.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityCTR.index,
);

export default providersRouter;
