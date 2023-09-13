export enum NavigateOldTransfer {
  home = '/transferencia',
  step1 = '/transferencia/nueva-transferencia/a-quien',
  step2 = '/transferencia/nueva-transferencia/por-cuanto',
  step3 = '/transferencia/nueva-transferencia/cuando',
  step4 = '/transferencia/nueva-transferencia/confirmacion',
  step5 = '/transferencia/nueva-transferencia/exitosa',
  step6 = '/transferencia/nueva-transferencia/programada',
  step7 = '/transferencia/nueva-transferencia/pendiente',
}

export interface INavigateOldTransfer {
  home: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
}
