import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Usuário/ senha estão incorretos', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Usuário/ senha estão incorretos', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
