import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Somente usuários autenticados pode trocar o avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
