import { combineReducers } from '@ngrx/store';
import { freeDestinationsDetail } from './free-destiny/free-destinations-detail.reducer';

import { BanksReducer as banks } from '@store/reducers/models/banks/banks.reducer';
import { BanksReducer as loans_banks } from '@store/reducers/models/banks/loans_banks.reducer';
import { CategoriesReducer as categories } from '@store/reducers/models/categories/categories.reducer';
import { freeDestinyReducer as freeDestinations } from '@store/reducers/models/free-destiny/free-destinations.reducer';
import { movementReducer as movement } from '@store/reducers/models/movements/movement.reducer';
import { loansUserReducer as loans_user } from '@store/reducers/models/payment/loans-user/loans-user.reducer';
import { paymentBillReducer as payment_bill } from '@store/reducers/models/payment/payment-bills-public/payment-bills-public.reducer';
import { allBillsRegisteredReducer as allBills } from '@store/reducers/models/payment/payment-bills/all-registered-bills.reducer';
import { billsUserReducer as bills_user } from '@store/reducers/models/payment/payment-bills/payment-bills.reducer';
import { recurringPaymentReducer as recurringSaved } from '@store/reducers/models/payment/recurring/recurring-payment.reducer';
import { productReducer as product } from '@store/reducers/models/product/product.reducer';
import { productsReducer as products } from '@store/reducers/models/products/products.reducer';
import { accountTransferReducer as account_transfer } from '@store/reducers/models/transfer/account-transfer/account-tranfer.reducer';
// tslint:disable-next-line:max-line-length
import { destinationProductsReducer as destination_products } from '@store/reducers/models/transfer/destination-products/destination-products.reducer';
import { registerDestinationProductReducer as register_product_affiliation } from '@store/reducers/models/transfer/destination-products/register-destination-product.reducer';
import { formStepOneReducer as form_one } from '@store/reducers/models/transfer/steps/form-step-one.reducer';
import { formStepThreeReducer as form_three } from '@store/reducers/models/transfer/steps/form-step-three.reducer';
import { formStepTwoReducer as form_two } from '@store/reducers/models/transfer/steps/form-step-two.reducer';
import { previousStepReducer as previous_step } from '@store/reducers/models/transfer/steps/previous_step.reducer';
import { stepReducer as step } from '@store/reducers/models/transfer/steps/step.reducer';

import { movementFilterReducer as movementFilter } from '@store/reducers/models/movements/filterMovement.reducer';
import { movementDataReducer as movementInfo } from '@store/reducers/models/movements/infoProductMovement.reducer';
import { accountPaymentReducer as account_payment } from '@store/reducers/models/payment/account-payment/account-payment.reducer';
import { paymentTypeReducer as paymentType } from '@store/reducers/models/payment/payment-type/payment-type.reducer';
import { formStepOneReducer as p_form_one } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { formStepThreeReducer as p_form_three } from '@store/reducers/models/payment/steps/form-step-three.reducer';
import { formStepTwoReducer as p_form_two } from '@store/reducers/models/payment/steps/form-step-two.reducer';
import { previousStepReducer as p_previous_step } from '@store/reducers/models/payment/steps/previous_step.reducer';
import { stepReducer as p_step } from '@store/reducers/models/payment/steps/step.reducer';
import { productActiveReducer as productActive } from '@store/reducers/models/product-active/product-active.reducer';
import {
  otherProductReducer as avalProducts,
  otherProductShowReducer as showProducts,
} from '@store/reducers/models/products/other-products.reducer';
import { formStepOneRechargeReducer as formOneRecharge } from '@store/reducers/models/recharge/form-step-one.reducer';
import { operatorsReducer as operators } from '@store/reducers/models/recharge/operators.reducer';
import { rechargeReducer as rechargePhone } from '@store/reducers/models/recharge/recharge.reducer';
import { StepRechargeReducer as stepRecharge } from '@store/reducers/models/recharge/step.reducer';
import { toPlusReducer as toPlus } from '@store/reducers/models/to-plus/to-plus.reducer';
import { favoriteReducer as favorites } from '@store/reducers/models/transfer/favorites/favorites.reducer';
import { historyTransferReducer as historicTransfer } from '@store/reducers/models/transfer/historic/historic.reducer';
import { pendingTransferReducer as pendingTransfer } from '@store/reducers/models/transfer/pendingTransfer/pending-tranfer.reducer';
import { scheduledTransferCreateReducer as scheduledTransferC } from '@store/reducers/models/transfer/scheduledTransfers/scheduled-create.reducer';
import { scheduledTransferDeleteReducer as scheduledTransferD } from '@store/reducers/models/transfer/scheduledTransfers/scheduled-delete.reducer';
import { scheduledTransferReducer as scheduledTransfer } from '@store/reducers/models/transfer/scheduledTransfers/scheduled.reducer';
import { stepWReducer as step_w } from '@store/reducers/models/withdrawal/steps/stepw.reducer';
import { whatDoYouWantReducer as type_withdrawal } from '@store/reducers/models/withdrawal/steps/what-do-you-want.reducer';
import { withdrawalStepTwoReducer as data_withdrawal } from '@store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';
import { certPdfGenReducer as certificates } from './certificates/pdfgen.reducer';
import { BankLoansReducer as bank_loans } from './payment/bank_loans.reducer';
import { saveAgreementReducer as serviceSaved } from './payment/search-companies/save-agreement.reducer';
import { pocketsReducer as pockets } from './pockets/user-pockets.reducer';
import { pdfGenReducer as pdfstatement } from './statements/pdfgen.reducer';
import { statementReducer as statements } from './statements/statements.reducer';
import { noCardWitdrawalReducer as no_card } from './withdrawal/no-card/no-card.reducer';
import { otpValidateReducer as otp_validated } from './withdrawal/steps/validate-otp.reducer';

import { companyActiveReducer as companyActive } from './payment/search-companies/active-company.reducer';
import { companiesSearchReducer as companies } from './payment/search-companies/search-companies.reducer';

import {
  pfmCreditCardsReducer as creditCardsPFM,
  pfmExpensesReducer as expensesPFM,
  pfmItemsReducer as itemsPFM,
  pfmMovimentsReducer as movimentsPFM,
  pfmNavigateReducer as navigatePFM,
  pfmRecategorizeReducer as recategorizationPFM,
  productDetailPfmReducer as detailProductPFM,
} from '@app/modules/detail-product-pfm/store';
import { unusualOpApproveReducers as unusualApprove } from '@app/modules/unusual-operations/store/reducers/unusual-approve.reducers';
import { unusualOpQueryReducers as unusualQuery } from '@app/modules/unusual-operations/store/reducers/unusual-query.reducers';
import { advertisingtReducer as advertising } from '@app/store/reducers/models/advertising/advertising.reducer';

export const transfer = combineReducers({
  destination_products,
  account_transfer,
  form_one,
  form_two,
  step,
  previous_step,
  pendingTransfer,
  form_three,
  favorites,
  historicTransfer,
  scheduledTransfer,
  scheduledTransferC,
  scheduledTransferD,
  register_product_affiliation,
});

export const otherProducts = combineReducers({
  avalProducts,
  showProducts,
});

export const movements = combineReducers({
  movement,
  movementInfo,
  movementFilter,
});

export const payment = combineReducers({
  paymentType,
  loans_user,
  bills_user,
  allBills,
  payment_bill,
  account_payment,
  p_form_one,
  p_form_two,
  p_form_three,
  p_step,
  p_previous_step,
  bank_loans,
  companies,
  companyActive,
  serviceSaved,
  recurringSaved,
});

export const withdrawal = combineReducers({
  type_withdrawal,
  data_withdrawal,
  step_w,
  otp_validated,
  no_card,
});

export const statement = combineReducers({
  statements,
  pdfstatement,
});

export const recharge = combineReducers({
  formOneRecharge,
  stepRecharge,
  rechargePhone,
  operators,
});

export const productPFM = combineReducers({
  detailProductPFM,
  expensesPFM,
  creditCardsPFM,
  recategorizationPFM,
  movimentsPFM,
  itemsPFM,
  navigatePFM,
});

export const unusualOperations = combineReducers({
  unusualQuery,
  unusualApprove,
});

export const models = combineReducers({
  toPlus,
  products,
  freeDestinations,
  freeDestinationsDetail,
  otherProducts,
  movements,
  product,
  transfer,
  payment,
  banks,
  loans_banks,
  categories,
  withdrawal,
  pockets,
  statement,
  certificates,
  recharge,
  productActive,
  productPFM,
  advertising,
  unusualOperations,
});
