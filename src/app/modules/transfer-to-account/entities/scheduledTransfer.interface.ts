export interface IScheduledTransfersSearch {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  transfers?: IScheduledTransferSearch[];
  success?: boolean;
  ip?: string;
  cost?: string;
}

export interface IScheduledTransferSearch {
  companyId: string;
  id: string;
  idType: string;
  ipAddress: string;
  notes: string;
  dueDate: string;
  accountFromInformation: object;
  accountToInformation: object;
  transferInformation: object;
  invoiceNumber: string;
  requestId: string;
  approvedChallenge: boolean;
  scheduleInfo: object;
}

export interface IScheduleTransferCreate {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  scheduleId: number;
  success: boolean;
  dateTime: string;
  errorStatusCode: string;
  request: object;
  response: object;
}

export interface IScheduleTransferDelete {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}
