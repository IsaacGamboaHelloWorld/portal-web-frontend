export enum optionTabsEnum {
  resumen = 'Resumen',
  incomens = 'Ingresos',
  expenses = 'Gastos',
}

export interface IOptionTabs {
  resumen: optionTabsEnum;
  incomens: optionTabsEnum;
  expenses: optionTabsEnum;
}

export const mapTabForOperationType = {
  [optionTabsEnum.incomens]: 'C',
  [optionTabsEnum.expenses]: 'D',
  null: null,
  undefined: null,
};

export enum optionTabsExpensesEnum {
  expenses = 'Gastos',
  expensesManually = 'Gastos registrados manualmente',
}

export interface IOptionExpensesTabs {
  expenses: optionTabsExpensesEnum;
  expensesManually: optionTabsExpensesEnum;
}
