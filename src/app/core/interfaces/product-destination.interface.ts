export interface IProductAffiliation {
  productAffiliations: IProductAffiliationElement[];
  approvalId: string;
  errorMessage: string;
  success: boolean;
}

export interface IRegisterProductAffiliation {
  productAffiliation: IProductAffiliationElement;
  approvalId: string;
  errorMessage: string;
  success: boolean;
}

export interface IProductAffiliationElement {
  originAccountId?: string;
  originAccountType?: string;
  originAccountName?: string;
  destinationAccountId?: string;
  destinationAccountType?: string;
  customerId?: string;
  customerIdType?: string;
  customerName?: string;
  email?: string;
  bankId?: string;
  bankName?: string;
  originNickName?: string;
}

export interface OriginAccountRegistrationProduct {
  accountId: string;
  accountType: string;
}
