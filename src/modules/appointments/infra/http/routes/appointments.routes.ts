import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import AppointmentsCTR from '../controllers/AppointmentsCTR';


const appointmentsRouter = Router();

const appointmentsCTR = new AppointmentsCTR();

appointmentsRouter.use(ensuredAuthenticated);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
    //     return response.json(await appointmentsRepository.find());
    // });

    appointmentsRouter.post('/', appointmentsCTR.create);

export default appointmentsRouter;
