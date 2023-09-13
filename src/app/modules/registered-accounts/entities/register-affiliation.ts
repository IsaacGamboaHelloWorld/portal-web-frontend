import {
  IProductAffiliationElement,
  OriginAccountRegistrationProduct,
} from '@app/core/interfaces/product-destination.interface';

export class RegisterAffiliationData {
  step: number;
  data: IProductAffiliationElement;
  products: OriginAccountRegistrationProduct[];
}
