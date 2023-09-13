export enum NavigateFastTransfer {
  home = '/',
  transfer = '/transferencia',
  step1 = '/transferencia/transferencia-rapida',
  step2 = '/transferencia/transferencia-rapida/confirmacion',
  step3 = '/transferencia/transferencia-rapida/exitosa',
}

export interface INavigateFastTransfer {
  home: string;
  transfer: string;
  step1: string;
  step2: string;
  step3: string;
}
