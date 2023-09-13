export enum TYPE_PAYMENTS {
  PSE = 'PSE',
  PSE_PRIVATE = 'PSE_PRIVATE',
  LOAN = 'LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  BILLER = 'BILLER',
  NON_BILLER = 'NON_BILLER',
}

export interface ITypePayments {
  PSE: string;
  PSE_PRIVATE: string;
  LOAN: string;
  CREDIT_CARD: string;
  BILLER: string;
  NON_BILLER: string;
}

export enum status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}
