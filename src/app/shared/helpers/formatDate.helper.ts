export function formatDateToISO(date: Date): string {
  const d = new Date(date);
  let month: string = '' + (d.getMonth() + 1);
  let day: string = '' + d.getDate();
  const year: number = d.getFullYear();
  let dateFinal: string;

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  dateFinal = [year, month, day].join('-');
  return `${dateFinal}T00:00:00.000`;
}
