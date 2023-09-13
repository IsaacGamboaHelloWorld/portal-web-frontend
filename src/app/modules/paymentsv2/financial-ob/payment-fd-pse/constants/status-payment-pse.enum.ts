export enum StatusPaymentPseEnum {
  Pending = '1',
  Rejected = '2',
  Failed = '3',
  Approved = '4',
  Expired = '5',
  Unauthorized = '6',
}

export interface IStatusPaymentPse {
  Pending: string;
  Rejected: string;
  Failed: string;
  Approved: string;
  Expired: string;
  Unauthorized: string;
}
