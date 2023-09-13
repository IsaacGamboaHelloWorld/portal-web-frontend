export enum NavigatePayStack {
  payment = '/pagos',
  step1 = '/pago-pila/donde',
  step2 = '/pago-pila/por-cuanto',
  step3 = '/pago-pila/cuando',
  step4 = '/pago-pila/confirmar',
}

export interface INavigatePayStack {
  payment: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
