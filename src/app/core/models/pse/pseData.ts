export interface PSEGetData {
  detail: {
    transaction: {
      trnRqUID: string;
      curAmt: {
        amt: string;
        curCode: string;
      };
      clientDt: string;
      trnSrc: string;
    };
    invoiceSender: {
      orgId: {
        orgIdNum: string;
      };
      orgInfo: {
        name: string;
      };
    };
    refInfo: IRefPayment[];
    pmtStatus: {
      chkNum: string;
    };
    bankInfo: {
      bankId: string;
    };
    depAcctStmtRec: {
      url: string;
    };
    taxPmtInfo: {
      serviceCode: string;
    };
    NIE: {
      number: string;
    };
  };
  success: boolean;
  errorMessage?: string;
}

export interface IRefPayment {
  refType: string;
  refId: string;
}
