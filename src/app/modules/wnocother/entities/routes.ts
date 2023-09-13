export enum NavigateWnocother {
  payment_type = '/',
  payment = '/detalle/',
  step1 = '/giros/tipo',
  step2 = '/giros/por-cuanto',
  step3 = '/giros/confirmar',
  step4 = '/giros/exitoso',
}

export interface INavigateWnocother {
  payment_type: string;
  payment: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
