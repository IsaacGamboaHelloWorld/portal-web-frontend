export interface ICustomerProfileCatalog {
  data: CustomerProfileCatalog;
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}
export class CustomerProfileCatalog {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  catalogs: CatalogDetail;
  success: boolean;
}

export class CatalogDetail {
  [key: string]: CatalogItemDetail[];
}

export class CatalogItemDetail {
  code?: string;
  shortName?: string;
  longName?: string;
}
