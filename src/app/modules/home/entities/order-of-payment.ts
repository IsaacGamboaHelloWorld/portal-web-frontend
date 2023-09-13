export interface IOrderPaymentAll {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  payrollLoans?: IPayrollLoans[];
  success?: boolean;
}

export interface IPayrollLoans {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  accountId?: string;
  accountType?: string;
  status?: string;
  sector?: string;
  subSector?: string;
  company?: ICompany;
  openingDate?: string;
  closingDate?: string;
  saleDate?: string;
  purchaseDate?: string;
  initialAmount?: string;
  balanceAmount?: string;
  fees?: number;
  payedFees?: number;
  chargedFees?: number;
  approvedAmount?: number;
  approvalRate?: string;
  feeAmount?: string;
  disbursementAmount?: number;
  disbursementDate?: string;
  initialPaymentDate?: string;
  finalPaymentDate?: string;
  nextPaymentDate?: string;
  initDateArrears?: string;
  daysArrears?: string;
  lastPaymentDate?: string;
  obligationBalance?: number;
  modality?: string;
  economicStatus?: string;
  success?: boolean;
  percentaje?: number;
  total?: number;
  statusDetail?: string;
}

export interface ICompany {
  id: string;
  name: string;
  invoiceId: string;
  sliceName?: string;
}
