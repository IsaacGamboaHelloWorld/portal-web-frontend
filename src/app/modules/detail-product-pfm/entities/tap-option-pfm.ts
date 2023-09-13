import {
  optionTabsEnum,
  optionTabsExpensesEnum,
} from '../constans/tabs-options.enum';

export interface TapOptionPfm {
  id: optionTabsEnum;
  label: optionTabsEnum;
}

export interface TapOptionExpensesPfm {
  id: optionTabsExpensesEnum;
  label: optionTabsExpensesEnum;
}

export interface IDatePfm {
  month: string;
  year: string;
}
