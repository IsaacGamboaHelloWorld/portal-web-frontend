import { CreditCardMovementInterface } from '@core/interfaces/creditCardMovement.interface';
import { AccountInfo } from '@core/models/movement/acountInfo';
import { Operation } from '@core/models/movement/operations';

export class Movement {
  accountInformation: AccountInfo;
  operations: Operation[];
  base64: string;
  creditCardMovements: CreditCardMovementInterface[];
  cdtMovements: any;
  success?: boolean;
  errorMessage?: string;
}
