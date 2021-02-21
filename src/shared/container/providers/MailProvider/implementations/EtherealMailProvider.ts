import NodeMailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/MailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    NodeMailer.createTestAccount()
      .then(account => {
        const transporter = NodeMailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => {
        console.error('Falha ao criar o email');
        console.error(err);
      });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Teste GoBarber <testebarber@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', NodeMailer.getTestMessageUrl(message));
  }
}
