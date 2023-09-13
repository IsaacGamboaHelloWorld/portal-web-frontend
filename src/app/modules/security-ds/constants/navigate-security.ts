export enum NavigateSecurity {
  home = '',
  access_control = 'control-acceso',
  limit_management = 'administracion-topes',
}

export interface INavigateSecurity {
  home: string;
  access_control: string;
  limit_management: string;
}
