import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default appointmentsRouter;
