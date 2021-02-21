import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@gmaiil.com',
      password: '12345678',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Doe 3',
      email: 'johndoe3@gmaiil.com',
      password: '12345678',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toStrictEqual([user1, user2]);
  });
});
