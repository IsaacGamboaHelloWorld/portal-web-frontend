export interface IRespondOperators {
  mobileOperators: IOperator[];
  success: boolean;
  errorMessage: string;
}

export interface IOperator {
  id: string;
  code: string;
  name: string;
}
