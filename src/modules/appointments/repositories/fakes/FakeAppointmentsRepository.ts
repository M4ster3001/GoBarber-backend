import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

// Repository seria como se fosse uma função e o <Appointment> seria um parametro
class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date));

        return findAppointment;
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, {id: v4(), date, provider_id})

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;
