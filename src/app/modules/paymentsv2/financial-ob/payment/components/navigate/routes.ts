export enum NavigatePayment {
  payment_type = '/pagos/ob-bancaria',
  home_payment = '/pagos',
  step1 = '/pagos/ob-bancaria/pagar/quien',
  step2 = '/pagos/ob-bancaria/pagar/cuanto',
  step3 = '/pagos/ob-bancaria/pagar/cuando',
  step_confirmation = '/pagos/ob-bancaria/pagar/confirmar',
  step_end = '/pagos/ob-bancaria/pagar/exitoso',
}

export interface INavigatePayment {
  payment_type: string;
  home_payment: string;
  step1: string;
  step2: string;
  step3: string;
  step_confirmation: string;
  step_end: string;
}
