import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';

export default class ForgotPasswordCTR {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
