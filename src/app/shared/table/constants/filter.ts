export const RANGE = 'range';
export const DATE_FILTER = 'date';
export const DEFAULT_RANGE = 90;
export const MAX_ITEMS = 10;

const today = new Date().toISOString();
const week = new Date(
  new Date().setDate(new Date().getDate() - 7),
).toISOString();
const yesterday = new Date(
  new Date().setDate(new Date().getDate() - 1),
).toISOString();
const month = new Date(
  new Date().setMonth(new Date().getMonth() - 1),
).toISOString();

export const FILTER: Array<{ name: string; value: string[] }> = [
  {
    name: 'Hoy',
    value: [today, today],
  },
  {
    name: 'Último día',
    value: [yesterday, today],
  },
  {
    name: 'Última semana',
    value: [week, today],
  },
  {
    name: 'Último mes',
    value: [month, today],
  },
];
