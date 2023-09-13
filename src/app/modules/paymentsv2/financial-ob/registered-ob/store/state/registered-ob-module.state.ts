import { IRegisteredObligationPaymentPayments } from '../reducers/registered-ob-reducer';

export const RegisteredObFeatureName = 'RegisteredObModuleState';

export type RegisteredObModuleState = Readonly<{
  registeredObligation: IRegisteredObligationPaymentPayments;
}>;
