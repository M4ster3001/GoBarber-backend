import {container} from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';


container.registerSingleton<IAppointmentsRepository>('AppointmentRepository',AppointmentsRepository);
container.registerSingleton<IUserRepository>('UsersRepository',UsersRepository);