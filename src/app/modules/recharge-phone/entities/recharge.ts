import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IRespondRecharge extends GenericResponse {
  approvalId: string;
  rechargeInfo: {
    accountId: string;
    accountType: string;
    phoneNumber: string;
    amount: string;
    operatorName: string;
    currencyCode: string;
    companyId: string;
    id: string;
    idType: string;
    ipAddress: string;
    currentSystemDate?: string;
    transactionCost?: string;
  };
}
