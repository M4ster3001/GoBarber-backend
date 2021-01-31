import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserservice from './CreateUserService';

describe('Create', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserservice(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12123123'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserservice(fakeUsersRepository);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12123123'
        });

        expect(createUser.execute({
            name: 'John Doe 2',
            email: 'johndoe@example.com',
            password: '12122323'
        })).rejects.toBeInstanceOf(AppError);
    })
})
