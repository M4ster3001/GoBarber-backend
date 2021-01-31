import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
// Repository seria como se fosse uma função e o <Appointment> seria um parametro
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
