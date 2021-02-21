import { promises } from 'fs';
import handleBars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplate';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandleBarMailTemplateProviders implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handleBars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandleBarMailTemplateProviders;
