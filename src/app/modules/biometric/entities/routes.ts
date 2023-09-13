export enum NavigateBiometric {
  dashboard = '/',
  security = '/seguridad',
  info = '/biometrico/inicio',
  home = '/biometrico/home',
  name = '/biometrico/name',
  terms = '/biometrico/condiciones',
}

export interface INavigateBiometric {
  dashboard: string;
  security: string;
  info: string;
  home: string;
  name: string;
  terms: string;
}
