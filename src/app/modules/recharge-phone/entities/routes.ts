export enum NavigateRechargePhone {
  home = '/',
  detail = '/detalle/',
  step1 = '/recargas/recargar',
  step2 = '/recargas/confirmacion',
  step3 = '/recargas/exito',
}

export interface INavigateRechargePhone {
  home: string;
  detail: string;
  step1: string;
  step2: string;
  step3: string;
}
