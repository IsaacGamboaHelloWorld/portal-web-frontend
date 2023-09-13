export enum OptionsDownload {
  INCOME_TAX = 'Retención en la fuente',
  GMF = 'GMF',
  RENTAL = 'Declaración de renta TC',
  RAC = 'Reporte anual de costos',
}
export interface IOptionsDownload {
  GMF: string;
  INCOME_TAX: string;
  RENTAL: string;
  RAC: string;
}
