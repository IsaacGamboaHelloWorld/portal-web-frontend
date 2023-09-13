import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface AvalpayDetailResponse extends GenericResponse {
  bankCusLimitRec: {
    trnCode: string;
  };
  bankInfo: {
    bankId: string;
  };
  curAmt: {
    curCode: string;
  };
  depAcctStmtRec: {
    url: string;
  };
  invoiceInfo: InvoiceInfo[];
  invoiceSender: {
    category: string;
    orgId: {
      orgIdNum: string;
    };
    orgInfo: {
      name: string;
    };
  };
  personInfo: PersonInfo[];
  pmtStatus: {
    chkNum: string;
    pmtType: string;
    statusCode: string;
    statusDesc: string;
  };
  refInfo: RefInfo[];
  taxPmtInfo: {
    curAmt: {
      amt: number;
      curCode: string;
    };
    serviceCode: string;
  };
  transaction: {
    clientDt: string;
    curAmt: {
      amt: number;
      curCode: string;
    };
    finalPrcDt: string;
    trnRqUid: string;
    trnSrc: string;
  };
  trnState: {
    desc: string;
    state: string;
  };
}

interface InvoiceInfo {
  nie: string;
}

interface PersonInfo {
  personName: {
    legalName: string;
    lastName: string[];
    firstName: string;
    middleName: string;
    titlePrefix: string;
  };
  govIssueIdent: {
    govIssueIdentType: string;
    stateProv: string;
    country: string;
    identSerialNum: string;
  };
  birthDt: string;
  gender: string;
  contactInfo: {
    postAddr: {
      stateProv: string;
      country: string;
      city: string;
      addr1: string;
    };
    emailAddr: string;
    phoneNum: {
      phone: number;
    };
  };
}

interface RefInfo {
  refId: string;
  refType: string;
}
