import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensuredAuthenticated);

appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;