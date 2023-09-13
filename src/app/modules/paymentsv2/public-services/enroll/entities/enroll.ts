export interface ICompany {
  organizationIdType: number;
  organizationId: number;
  entityName: string;
  industryCode: number;
  image: string;
  phoneType: string;
  phone: string;
  category: string;
  address: string;
  cityId: number;
  city: string;
  partialPayment: boolean;
  active: boolean;
  onlinePayment: number;
  svcId: number;
  noBillerMainReference: string;
  bankName: string;
  bankCode: number;
}

export interface ICompanyListResponse {
  agreements: ICompany[];
  success: boolean;
  errorMessage: string;
}
export interface IActiveCompanySave {
  company_code: number;
  company_name: string;
  billId: string;
}

export interface IAgreementSavedResponse {
  approvalId: number;
  errorMessage?: string;
  success: boolean;
}

export interface IAgreementSaved {
  approvalId: number;
  errorMessage?: string;
  success: boolean;
}
