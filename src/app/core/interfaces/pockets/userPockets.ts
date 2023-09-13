import { PocketsByProduct } from '@app/core/models/products/pockets/pocketsByProduct';

export class IUserPockets {
  currentPocketsByProduct?: PocketsByProduct[];
  success: boolean;
  errorMessage?: string;
}
