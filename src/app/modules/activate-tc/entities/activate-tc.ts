export interface IActivateTcModuleState {
  activate: IAnswerActivateTc;
}

export interface ISendActivateTc {
  accountId: string;
}

export interface IAnswerActivateTc {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  details?: IDetailActivateTc;
  success?: boolean;
}

export interface IDetailActivateTc {
  companyId: string;
  accountId: string;
  accountType: string;
}
