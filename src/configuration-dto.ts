export interface ISelect {
    order: string;
    peopleOrder: string;
    direction: string;
  }
  export interface IApp {
    headerTitle: string;
    subHeaderTitle: string;
    logoHeaderPath: string;
    selectConfig: ISelect;
  }
  
  export interface IConfigurationDto {
    app: IApp;
    enviroment: {
      dev: {
        production: boolean;
        apiBaseUrl: string;
        enableXdebug: boolean;
      };
    };
  }