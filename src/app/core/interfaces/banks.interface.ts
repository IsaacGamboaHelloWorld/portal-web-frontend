export interface IBank {
  approvalId: null;
  errorMessage: null;
  banks: IBankElement[];
  success: boolean;
}

export interface IBankElement {
  value: string;
  name: string;
}
