export enum NavigateCodeAuth {
  home = '/seguridad',
  homeCodeAuth = '/codigo-2fa/inicio',
  step1 = '/codigo-2fa/onboarding',
  step2 = '/codigo-2fa/activar',
  experian = '/codigo-2fa/centrales-riesgo',
}

export interface INavigateCodeAuth {
  home: string;
  homeCodeAuth: string;
  step1: string;
  step2: string;
  experian: string;
}
