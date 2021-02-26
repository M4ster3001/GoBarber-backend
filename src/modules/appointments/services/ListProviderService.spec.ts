import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ShowProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
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

  it('should not be able to have in the cache', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    await fakeUserRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@gmaiil.com',
      password: '12345678',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Doe 3',
      email: 'johndoe3@gmaiil.com',
      password: '12345678',
    });

    const no_cache = jest.spyOn(fakeCacheProvider, 'recover');

    await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(no_cache).toHaveBeenCalled();
  });
});
