export interface ResponseOptionModule {
  success: boolean;
  error: boolean;
  errorMessage: null;
  errorStatusCode: null;
  specificErrorMessage: null;
  data: DataOption;
}

export interface DataOption {
  products: BaseOption<ProductsOptions>;
  organizer: BaseOption<null>;
  payments: BaseOption<PaymentsOptions>;
  transfers: BaseOption<TransfersOptions>;
  documents: BaseOption<DocumentsOptions>;
  certificate_taxes: BaseOption<CertificateTaxes>;
  contact: BaseOption<null>;
  profile: BaseOption<null>;
  security: BaseOption<SecurityOptions>;
  product_detail: BaseOption<ProductDetailOptions>;
  block_product: BaseOption<BlockProductOptions>;
}

export interface BaseOption<T> {
  show: boolean;
  options?: T;
}

export interface ProductsOptions {
  coexistence: boolean;
  current_account: boolean;
  deposit_account: boolean;
  credit_card: boolean;
  credit: boolean;
  cdt: boolean;
  free_destination: boolean;
  to_plus: boolean;
  product_actions: boolean;
  order_of_payment: boolean;
  btn_saving: boolean;
  btn_cdt: boolean;
  btn_credit_card: boolean;
}

export interface DocumentsOptions {
  extracts: boolean;
  certificate_product: boolean;
  certificate_taxes: boolean;
}

export interface PaymentsOptions {
  bank_obligation: boolean;
  public_service: boolean;
  payment_taxes: boolean;
  payment_stack: boolean;
  payment_history: boolean;
  payment_pse_free_destiny: boolean;
  payment_pse_credit_card: boolean;
}

export interface SecurityOptions {
  card_activate: boolean;
  alert_notifications: boolean;
  two_auth_factor: boolean;
  block_product: boolean;
  change_password: boolean;
  access_control: boolean;
  security_data: boolean;
  verification_methods: boolean;
  biometric_authentication: boolean;
  totp: boolean;
  unusual_operations: boolean;
  limit_management: boolean;
}

export interface TransfersOptions {
  create: boolean;
  management: boolean;
  favorite: boolean;
  edit: boolean;
  programmed: boolean;
  history: boolean;
  indefinite_transfers: boolean;
}

export interface ProductDetailOptions {
  orders_withdrawals: boolean;
  payment_obligation: boolean;
  transfer_money: boolean;
  recharge_cellphone: boolean;
  generate_statements: boolean;
  generate_certificates: boolean;
  pockets: boolean;
  pay_credit_card: boolean;
  advance: boolean;
  pfm: boolean;
  last_movements: boolean;
}

export interface BlockProductOptions {
  option_card: boolean;
  option_account: boolean;
  credit_card: boolean;
  debit_card: boolean;
  deposit_account: boolean;
  current_account: boolean;
}

export interface CertificateTaxes {
  tax_document_ret_source: boolean;
  tax_document_rac: boolean;
  tax_document_gmf: boolean;
  tax_document_tc: boolean;
}
