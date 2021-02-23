import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import AppointmentsCTR from '../controllers/AppointmentsCTR';
import ProviderAppointmentsCTR from '../controllers/ProviderAppointmentsCTR';

const appointmentsRouter = Router();

const appointmentsCTR = new AppointmentsCTR();
const providerAppointmentsCTR = new ProviderAppointmentsCTR();

appointmentsRouter.use(ensuredAuthenticated);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//     return response.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentsCTR.create);
appointmentsRouter.get('/me', providerAppointmentsCTR.index);

export default appointmentsRouter;
