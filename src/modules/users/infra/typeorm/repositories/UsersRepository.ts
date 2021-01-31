import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';

// Repository seria como se fosse uma função e o <Appointment> seria um parametro
class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByID(id: string): Promise<User | undefined> {
        const findAppointment = await this.ormRepository.findOne(id);

        return findAppointment;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findAppointment = await this.ormRepository.findOne({where: {email}});

        return findAppointment;
    }

    public async findByDate(date: Date): Promise<User | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create(userData: ICreateUserDTO): Promise<User>{
        const appointment = this.ormRepository.create(userData);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
