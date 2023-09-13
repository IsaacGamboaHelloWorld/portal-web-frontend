export enum NavigatePaymentFD {
  payment_type = '/pagos/ob-bancaria',
  home_payment = '/pagos',
  step1 = '/pagos/ob-bancaria/pse/desde',
  step2 = '/pagos/ob-bancaria/pse/datos',
  step3 = '/pagos/ob-bancaria/pse/valor',
  step_confirmation = '/pagos/ob-bancaria/pse/confirmar',
  step_end = '/pagos/ob-bancaria/pse/exitoso',
}

export interface INavigatePaymentFD {
  payment_type: string;
  home_payment: string;
  step1: string;
  step2: string;
  step3: string;
  step_confirmation: string;
  step_end: string;
}
