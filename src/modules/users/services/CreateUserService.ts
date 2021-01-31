import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
        ){}

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Esse e-mail já está em uso');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
