export enum NavigateAdvance {
  payment_type = '/',
  detail = '/detalle/',
  step1 = '/avance',
  step2 = '/avance/por-cuanto',
  step3 = '/avance/cuando',
  step4 = '/avance/exitoso',
}

export interface INavigateAdvance {
  payment_type: string;
  detail: string;

  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
