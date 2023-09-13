export enum TYPE_PAYMENTS {
  PSE = 'PSE',
  PSE_PRIVATE = 'PSE_PRIVATE',
  LOAN = 'LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  TC = 'TC',
  OTHER_CREDIT = 'OC',
  CREDIT = 'CREDIT',
  BILLER = 'BILLER',
  NON_BILLER = 'NON_BILLER',
}

export interface ITypePayments {
  PSE: string;
  PSE_PRIVATE: string;
  LOAN: string;
  CREDIT_CARD: string;
  TC: string;
  OTHER_CREDIT: string;
  CREDIT: string;
  BILLER: string;
  NON_BILLER: string;
}
