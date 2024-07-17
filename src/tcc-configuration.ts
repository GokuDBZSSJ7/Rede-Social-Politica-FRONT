import { IConfigurationDto } from './configuration-dto';

export const TCCConfiguration: IConfigurationDto = {
  app: {
    headerTitle: 'TCC',
    subHeaderTitle: 'Grupo',
    logoHeaderPath: '/assets/img/logo_header.png',
    selectConfig: {
      order: 'name',
      peopleOrder: 'name,company_name',
      direction: 'asc',
    }
  },
  enviroment: {
    dev: {
      production: false,
      apiBaseUrl: 'http://localhost:8000/api/',
      enableXdebug: true,
    },
  },
};