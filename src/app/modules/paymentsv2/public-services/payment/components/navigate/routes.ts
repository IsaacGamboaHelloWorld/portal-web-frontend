export enum NavigatePayment {
  home = '/pagos/servicios/',
  step1 = '/pagos/servicios/pagar/desde',
  step2 = '/pagos/servicios/pagar/cuanto',
  step_confirmation = '/pagos/servicios/pagar/confirmar',
  step_end = '/pagos/servicios/pagar/exitoso',
}

export interface INavigatePayment {
  home: string;
  step1: string;
  step2: string;
  step_confirmation: string;
  step_end: string;
}
