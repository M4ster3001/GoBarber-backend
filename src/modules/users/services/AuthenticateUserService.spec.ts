import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Create', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateService(fakeUsersRepository, fakeHashProvider);
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12123123'
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '12123123'
        });

        expect(response).toHaveProperty('token');

        expect(response.user).toEqual(user);
    });

    // it('should not be able to create a new user with same email', async () => {
    //     const fakeUsersRepository = new FakeUsersRepository();
    //     const createUser = new AuthenticateService(fakeUsersRepository);

    //     await createUser.execute({
    //         name: 'John Doe',
    //         email: 'johndoe@example.com',
    //         password: '12123123'
    //     });

    //     expect(createUser.execute({
    //         name: 'John Doe 2',
    //         email: 'johndoe@example.com',
    //         password: '12122323'
    //     })).rejects.toBeInstanceOf(AppError);
    // })
})
