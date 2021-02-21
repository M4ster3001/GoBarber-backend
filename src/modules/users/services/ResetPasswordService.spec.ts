import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('Reset', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTokenRepository = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeTokenRepository,
    );
  });

  it('should be able to recovery the password using email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12352134',
    });

    const userToken = await fakeTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123520000',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findByID(user.id);

    expect(updatedUser?.password).toBe('123520000');
  });
});
