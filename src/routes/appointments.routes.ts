import { Request, Response, Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request: Request, response: Response) => {
    return response.json(appointmentsRepository.listAllAppointments());
});

appointmentsRouter.post('/', (request: Request, response: Response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ error: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
