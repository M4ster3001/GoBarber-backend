import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@gmaiil.com');
  });

  it('should be able to show the profile', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
