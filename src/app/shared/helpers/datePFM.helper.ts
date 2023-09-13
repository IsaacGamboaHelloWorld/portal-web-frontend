export interface DatePfm {
  label: string;
  month: number;
  monthName: string;
  year: number;
}

const monthsObj = {
  1: 'Ene',
  2: 'Feb',
  3: 'Mar',
  4: 'Abr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dic',
};
const monthsNameObj = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
};

export function getDatesPfm(): DatePfm[] {
  const minYear = 2020;
  const minMonth = 7; // desde Agosto del 2020 PFM tiene data
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const resultList = [];

  for (let y = currentYear; y >= minYear; y--) {
    const monthInit = y === currentYear ? currentMonth - 1 : 11;
    for (let m = monthInit; m >= 0; m--) {
      if (y === minYear && m < minMonth) {
        return resultList;
      }
      const data: DatePfm = {
        monthName: monthsNameObj[m + 1],
        month: m + 1,
        year: y,
        label: `${monthsObj[m + 1]} - ${y}`,
      };
      resultList.push(data);
    }
  }

  return resultList;
}

export function formattMonthToName(month: string, isShort: boolean): string {
  const monthNumber = parseInt(month, 10);
  return isShort ? monthsObj[monthNumber] : monthsNameObj[monthNumber];
}
