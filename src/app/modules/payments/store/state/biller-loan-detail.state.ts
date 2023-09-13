import { BillerLoanDetailState } from '../reducers/biller-loan-detail.reducers';

export const NewBillerLoanDetailFeatureName = 'NewBillerLoanDetailState';

export type ActiveProdHomeState = Readonly<{
  billerLoanDetail: BillerLoanDetailState;
}>;
