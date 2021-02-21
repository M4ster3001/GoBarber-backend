import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/MailProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/StorageProvide';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
