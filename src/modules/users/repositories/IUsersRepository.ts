import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(id: string): Promise<User | undefined>;
  findByID(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
