import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';


const appointmentsRouter = Router();

appointmentsRouter.use(ensuredAuthenticated);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
    //     return response.json(await appointmentsRepository.find());
    // });

    appointmentsRouter.post('/', async (request: Request, response: Response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
