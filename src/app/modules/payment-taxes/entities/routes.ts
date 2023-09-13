export enum NavigatePaymentTaxes {
  payment_type = '/pagos/tipo-pago',
  payment = '/pagos',
  step1 = '/pagos-impuestos/a-quien',
  step2 = '/pagos-impuestos/por-cuanto',
  step3 = '/pagos-impuestos/cuando',
  step4 = '/pagos-impuestos/confirmar',
}

export interface INavigatePaymentTaxes {
  payment_type: string;
  payment: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
