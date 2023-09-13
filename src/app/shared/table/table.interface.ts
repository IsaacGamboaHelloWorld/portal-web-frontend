export interface FilterDateModel {
  hasFilter: boolean;
  data: object[];
  typeFilter: any;
  name: string;
  from: Date;
  to: Date;
}

export interface StartDateEndDateModel {
  minDate: Date;
  maxDate: Date;
}
