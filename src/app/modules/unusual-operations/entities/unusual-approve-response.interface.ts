import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { UnusualBlockTypeEnum } from '../constants/unusual-block-type.enum';

export interface IUnusualOPApproveResponse extends GenericResponse {
  AdditionalData: IAdditionalData[];
  typeOperation: UnusualBlockTypeEnum;
}

export interface IAdditionalData {
  Name: string;
  Value: string;
  ProductId: string;
}
