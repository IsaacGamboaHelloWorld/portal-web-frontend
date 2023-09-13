import { isNullOrUndefined } from 'util';
import { AccountBalance } from './accountBalance';
import { AccountType } from './accountType';

export class Product {
  accountInformation?: AccountType;
  status?: string;
  openedDate?: string;
  closedDate?: string;
  dueDate?: string;
  overDraftDays?: string;
  term?: {
    units: string;
    count: number | string;
  };
  periodicityOfPayment?: string;
  capacity?: number;
  couldHavePockets?: boolean;
  productAccountBalances?: {
    cupo_disponible_compras_pesos: AccountBalance;
    cupo_disponible_avances_pesos: AccountBalance;
    compras_y_avances_pendientes_por_posteo: AccountBalance;
    pagos_pendientes_por_posteo: AccountBalance;
    pago_total: AccountBalance;
    pago_total_pesos: AccountBalance;
    saldo_mora_pesos: AccountBalance;
    valor_pago_minimo: AccountBalance;
    saldo_canje_48_horas: AccountBalance;
    saldo_ayer: AccountBalance;
    cupo_total: AccountBalance;
    cupo_disponible_sobregiro: AccountBalance;
    saldo_disponible: AccountBalance;
    cupos_aprobado_sobregiro: AccountBalance;
    saldo_pendiente_pago: AccountBalance;
    saldo_canje_72_horas: AccountBalance;
    saldo_canje_24_horas: AccountBalance;
    saldo_canje: AccountBalance;
    saldo_actual: AccountBalance;
    cupo_aprobado_remesas: AccountBalance;
    valor_constitucion: AccountBalance;
    intereses_causados: AccountBalance;
    tasa_nominal: AccountBalance;
    cupo_disponible_compras: AccountBalance;
  };
  pocketsInformation?: {
    totalSavedOnPockets: string;
  };
  success?: boolean;
  errorMessage?: string;
  didAthCall?: boolean;
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
  id?: string;
  type?: string;
  typeAccount?: string;
  enabled?: boolean;
  nickName?: string;

  public static hasProductData(product: Product): boolean {
    return (
      !isNullOrUndefined(product) &&
      !isNullOrUndefined(product.productAccountBalances)
    );
  }

  public static getMinimumPayment(product: Product): number {
    const minPayment: number =
      this.hasProductData(product) &&
      !isNullOrUndefined(product.productAccountBalances.valor_pago_minimo)
        ? product.productAccountBalances.valor_pago_minimo.amount
        : 0;
    return minPayment;
  }

  public static getTotalPayment(product: Product): number {
    const totalPayment: number =
      this.hasProductData(product) &&
      !isNullOrUndefined(product.productAccountBalances.pago_total_pesos)
        ? product.productAccountBalances.pago_total_pesos.amount
        : 0;
    return totalPayment;
  }
}
