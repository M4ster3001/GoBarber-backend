import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlerBarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
