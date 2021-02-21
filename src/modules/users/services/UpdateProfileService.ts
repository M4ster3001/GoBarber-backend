import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findByID(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const existsEmail = await this.userRepository.findByEmail(email);

    if (existsEmail && existsEmail.id !== user_id) {
      throw new AppError('O e-mail já está me uso');
    }

    if (password) {
      if (!old_password) {
        throw new AppError('É necessário informado a senha antiga');
      }

      const hashOldPassword = await this.hashProvider.generateHash(
        old_password,
      );

      if (hashOldPassword !== user.password) {
        throw new AppError('A senha antiga está errada');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
