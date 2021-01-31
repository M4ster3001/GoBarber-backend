import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

// Repository seria como se fosse uma função e o <Appointment> seria um parametro
class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id, date});

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
