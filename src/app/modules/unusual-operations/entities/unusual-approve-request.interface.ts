import { UnusualBlockTypeEnum } from '../constants/unusual-block-type.enum';

export interface IUnusualOPApproveRequest {
  productInfo: IProductInfo[];
  typeOperation: UnusualBlockTypeEnum;
}

export interface IProductInfo {
  productId: string;
  productType: string;
  transactionInfo: ItransactionInfo[];
}

export interface ItransactionInfo {
  trnId: string;
}
