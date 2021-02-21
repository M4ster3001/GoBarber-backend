import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 2',
      email: 'johndoe2@gmaiil.com',
    });

    expect(updatedUser.name).toBe('John Doe 2');
    expect(updatedUser.email).toBe('johndoe2@gmaiil.com');
  });

  it('should not be able to change email to existing email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    const user = await fakeUserRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@gmaiil.com',
      password: '12312312',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe@gmaiil.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 2',
      email: 'johndoe2@gmaiil.com',
      old_password: '12345678',
      password: '12333212',
    });

    expect(updatedUser.password).toBe('12333212');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe2@gmaiil.com',
        old_password: '12345677',
        password: '12333212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmaiil.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe2@gmaiil.com',
        password: '12333212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
