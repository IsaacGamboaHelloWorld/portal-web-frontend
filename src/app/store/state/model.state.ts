import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';
import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import {
  IScheduleTransferCreate,
  IScheduleTransferDelete,
} from '@app/core/interfaces/scheduledTransfer.interface';
import { AdvertisingResponse } from '@app/core/models/advertising/advertisingData';
import {
  initPfmCreditCard,
  initPfmExpenses,
  initPfmItems,
  initPfmMoviments,
  initPfmNavigate,
  initPfmProduct,
  initPfmRecategorize,
  IPfmCreditCardstate,
  IPfmExpensesState,
  IPfmItemsState,
  IPfmMovimentsState,
  IPfmNavigateState,
  IPfmProductState,
  IPfmRecategorizeState,
} from '@app/modules/detail-product-pfm/store';
import {
  initUnusualOperation,
  IUnusualOperationState,
} from '@app/modules/unusual-operations/store/state/unsual-operations.state';
import { IFormOneTransferInterface } from '@core/interfaces/formOneTransfer.interface';
import { Product } from '@core/models/products/product';
import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { initUser, UserState } from '@store/reducers/global/auth/auth.reducer';
import { IBanks, initBanks } from '@store/reducers/models/banks/banks.reducer';
import {
  ICategories,
  initCategories,
} from '@store/reducers/models/categories/categories.reducer';
import {
  CertificatePdfGenState,
  initCertificatePdfGen,
} from '@store/reducers/models/certificates/pdfgen.reducer';
import {
  initMovementFilter,
  MovementFilterState,
} from '@store/reducers/models/movements/filterMovement.reducer';
import {
  initMovementData,
  MovementDataState,
} from '@store/reducers/models/movements/infoProductMovement.reducer';
import {
  initMovements,
  MovementsState,
} from '@store/reducers/models/movements/movement.reducer';
import {
  AccountPaymentState,
  initAccountPayment,
} from '@store/reducers/models/payment/account-payment/account-payment.reducer';
import {
  initLoansUser,
  LoansUserState,
} from '@store/reducers/models/payment/loans-user/loans-user.reducer';
import {
  initPaymentBillUser,
  PaymentBillState,
} from '@store/reducers/models/payment/payment-bills-public/payment-bills-public.reducer';
import {
  BillsUserState,
  initBillsUser,
} from '@store/reducers/models/payment/payment-bills/payment-bills.reducer';
import {
  initPaymentType,
  PaymentTypeState,
} from '@store/reducers/models/payment/payment-type/payment-type.reducer';
import {
  FormStepOneState as PFormStepOneState,
  initFormStepOne as PinitFormStepOne,
} from '@store/reducers/models/payment/steps/form-step-one.reducer';
import {
  FormStepThreeState as PFormStepThreeState,
  initFormStepThree as PinitFormStepThree,
} from '@store/reducers/models/payment/steps/form-step-three.reducer';
import {
  FormStepTwoState as PFormStepTwoState,
  initFormStepTwo as PinitFormStepTwo,
} from '@store/reducers/models/payment/steps/form-step-two.reducer';
import {
  initProductActive,
  IProductActive,
} from '@store/reducers/models/product-active/product-active.reducer';
import { initProduct } from '@store/reducers/models/product/product.reducer';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';
import {
  initProducts,
  ProductsState,
} from '@store/reducers/models/products/products.reducer';
import { initFormStepOneRecharge } from '@store/reducers/models/recharge/form-step-one.reducer';
import {
  initOperators,
  IOperators,
} from '@store/reducers/models/recharge/operators.reducer';
import {
  initRecharge,
  IRecharge,
} from '@store/reducers/models/recharge/recharge.reducer';
import {
  initPdfGen,
  PdfGenState,
} from '@store/reducers/models/statements/pdfgen.reducer';
import {
  initStatements,
  StatementsState,
} from '@store/reducers/models/statements/statements.reducer';
import {
  initToPlus,
  IToPlusState,
} from '@store/reducers/models/to-plus/to-plus.reducer';
import {
  DestinationProductsState,
  initDestinationProducts,
} from '@store/reducers/models/transfer/destination-products/destination-products.reducer';
import {
  IHistoric,
  initHistoricTransfer,
} from '@store/reducers/models/transfer/historic/historic.reducer';
import {
  initPendingTransfer,
  IPendingTransferState,
} from '@store/reducers/models/transfer/pendingTransfer/pending-tranfer.reducer';
import { initFormStepOne } from '@store/reducers/models/transfer/steps/form-step-one.reducer';
import {
  FormStepTwoState,
  initFormStepTwo,
} from '@store/reducers/models/transfer/steps/form-step-two.reducer';
import { initAdvertising } from '../reducers/models/advertising/advertising.reducer';
import { initFreeDestinationDetails } from '../reducers/models/free-destiny/free-destinations-detail.reducer';
import {
  FreeDestinyState,
  initFreeDestiny,
} from '../reducers/models/free-destiny/free-destinations.reducer';
import { IBankLoans } from '../reducers/models/payment/bank_loans.reducer';
import {
  BillsRegisteredState,
  initBillsRegistered,
} from '../reducers/models/payment/payment-bills/all-registered-bills.reducer';
import {
  initRecurringPayment,
  RecurringPaymentState,
} from '../reducers/models/payment/recurring/recurring-payment.reducer';
import {
  ActiveCompanyState,
  initCompanyActive,
} from '../reducers/models/payment/search-companies/active-company.reducer';
import {
  initSavedAgreement,
  SavedAgreementState,
} from '../reducers/models/payment/search-companies/save-agreement.reducer';
import {
  CompaniesSearchState,
  initCompaniesSearch,
} from '../reducers/models/payment/search-companies/search-companies.reducer';
import {
  initPockets,
  UserPocketsState,
} from '../reducers/models/pockets/user-pockets.reducer';
import {
  IAccountTransferState,
  initAccountTransfer,
} from '../reducers/models/transfer/account-transfer/account-tranfer.reducer';
import {
  initRegisterDestinationProduct,
  RegisterDestinationProductState,
} from '../reducers/models/transfer/destination-products/register-destination-product.reducer';
import {
  IFavorites,
  initFavorite,
} from '../reducers/models/transfer/favorites/favorites.reducer';
import { initTransferCreate } from '../reducers/models/transfer/scheduledTransfers/scheduled-create.reducer';
import { initScheduledTransferDelete } from '../reducers/models/transfer/scheduledTransfers/scheduled-delete.reducer';
import {
  initScheduledTransfer,
  IScheduledTransfers,
} from '../reducers/models/transfer/scheduledTransfers/scheduled.reducer';
import {
  FormStepThreeState,
  initFormStepThree,
} from '../reducers/models/transfer/steps/form-step-three.reducer';
import { WithDrawalState } from '../reducers/models/withdrawal/no-card/no-card.reducer';
import {
  initWithDrawalStepTwoState,
  WithDrawalStepTwoState,
} from '../reducers/models/withdrawal/steps/withdrawal-step-two.reducer';

export type ModelsState = Readonly<{
  toPlus: IToPlusState;
  products: ProductsState;
  freeDestinations: FreeDestinyState;
  freeDestinationsDetail: FreeDestinationDetail[];
  advertisingData: AdvertisingResponse;
  productPFM: {
    detailProductPFM: IPfmProductState;
    expensesPFM: IPfmExpensesState;
    creditCardsPFM: IPfmCreditCardstate;
    movimentsPFM: IPfmMovimentsState;
    recategorizationPFM: IPfmRecategorizeState;
    itemsPFM: IPfmItemsState;
    navigatePFM: IPfmNavigateState;
  };
  otherProducts: {
    avalProducts: OtherProduct[];
    showProducts: boolean;
  };
  user: UserState;
  movements: {
    movement: MovementsState;
    movementInfo: MovementDataState;
    movementFilter: MovementFilterState;
  };
  product: Product[];
  transfer: {
    account_transfer: IAccountTransferState;
    destination_products: DestinationProductsState;
    step: number;
    previous_step: number;
    form_one: IFormOneTransferInterface;
    form_two: FormStepTwoState;
    form_three: FormStepThreeState;
    pendingTransfer: IPendingTransferState;
    favorites: IFavorites;
    historicTransfer: IHistoric;
    scheduledTransfer: IScheduledTransfers;
    scheduledTransferC: IScheduleTransferCreate;
    scheduledTransferD: IScheduleTransferDelete;
    register_product_affiliation: RegisterDestinationProductState;
  };
  categories: ICategories;
  payment: {
    paymentType: PaymentTypeState;
    account_payment: AccountPaymentState;
    loans_user: LoansUserState;
    bills_user: BillsUserState;
    allBills: BillsRegisteredState;
    payment_bill: PaymentBillState;
    p_step: number;
    p_previous_step: number;
    p_form_one: PFormStepOneState;
    p_form_two: PFormStepTwoState;
    p_form_three: PFormStepThreeState;
    recurringSaved: RecurringPaymentState;
    bank_loans: IBankLoans;
    companies: CompaniesSearchState;
    companyActive: ActiveCompanyState;
    serviceSaved: SavedAgreementState;
  };
  withdrawal: {
    type_withdrawal: string;
    data_withdrawal: WithDrawalStepTwoState;
    step_w: number;
    otp_validated: OtpWithDrawal;
    no_card: WithDrawalState;
  };
  banks: IBanks;
  loans_banks: IBanks;
  pockets: UserPocketsState;
  statement: {
    statements: StatementsState;
    pdfstatement: PdfGenState;
  };
  recharge: {
    formOneRecharge: IFormOneRecharge;
    stepRecharge: number;
    rechargePhone: IRecharge;
    operators: IOperators;
  };
  productActive: IProductActive;
  certificates: CertificatePdfGenState;
  unusualOperations: IUnusualOperationState;
}>;

export const INITIAL_MODELS_STATE: ModelsState = {
  products: initProducts,
  freeDestinations: initFreeDestiny,
  freeDestinationsDetail: initFreeDestinationDetails,
  advertisingData: initAdvertising,
  productPFM: {
    detailProductPFM: initPfmProduct,
    expensesPFM: initPfmExpenses,
    creditCardsPFM: initPfmCreditCard,
    movimentsPFM: initPfmMoviments,
    recategorizationPFM: initPfmRecategorize,
    itemsPFM: initPfmItems,
    navigatePFM: initPfmNavigate,
  },
  toPlus: initToPlus,
  otherProducts: {
    avalProducts: [],
    showProducts: false,
  },
  user: initUser,
  movements: {
    movement: initMovements,
    movementInfo: initMovementData,
    movementFilter: initMovementFilter,
  },
  product: initProduct,
  transfer: {
    account_transfer: initAccountTransfer,
    destination_products: initDestinationProducts,
    step: 1,
    previous_step: 1,
    form_one: initFormStepOne,
    form_two: initFormStepTwo,
    form_three: initFormStepThree,
    pendingTransfer: initPendingTransfer,
    favorites: initFavorite,
    historicTransfer: initHistoricTransfer,
    scheduledTransfer: initScheduledTransfer,
    scheduledTransferC: initTransferCreate,
    scheduledTransferD: initScheduledTransferDelete,
    register_product_affiliation: initRegisterDestinationProduct,
  },
  categories: initCategories,
  payment: {
    paymentType: initPaymentType,
    account_payment: initAccountPayment,
    loans_user: initLoansUser,
    bills_user: initBillsUser,
    allBills: initBillsRegistered,
    payment_bill: initPaymentBillUser,
    p_step: 1,
    p_previous_step: 1,
    p_form_one: PinitFormStepOne,
    p_form_two: PinitFormStepTwo,
    p_form_three: PinitFormStepThree,
    recurringSaved: initRecurringPayment,
    bank_loans: initBanks,
    companies: initCompaniesSearch,
    companyActive: initCompanyActive,
    serviceSaved: initSavedAgreement,
  },
  banks: initBanks,
  loans_banks: initBanks,
  withdrawal: {
    type_withdrawal: null,
    data_withdrawal: initWithDrawalStepTwoState,
    step_w: 0,
    otp_validated: null,
    no_card: null,
  },
  pockets: initPockets,
  statement: {
    statements: initStatements,
    pdfstatement: initPdfGen,
  },
  recharge: {
    formOneRecharge: initFormStepOneRecharge,
    stepRecharge: 1,
    rechargePhone: initRecharge,
    operators: initOperators,
  },
  productActive: initProductActive,
  certificates: initCertificatePdfGen,
  unusualOperations: initUnusualOperation,
  // tslint:disable-next-line: max-file-line-count
};
