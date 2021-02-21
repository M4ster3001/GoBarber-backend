import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersCTR {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    console.log(request.body);
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      creat_at: user.create_at,
      update_at: user.update_at,
    };
    return response.json(userWithoutPassword);
  }

  public async update(request: Request, response: Response) {}
}
