import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordCTR {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const sendForgotPasswordService = container.resolve(ResetPasswordService);

    await sendForgotPasswordService.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
