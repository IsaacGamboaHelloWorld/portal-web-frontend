import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyFuncionalityAssets',
})
export class KeyFuncionalityAssetsPipe implements PipeTransform {
  transform(key: string, args: any[] = null): any {
    return this._matchName(key);
  }

  private _matchName(key: string): string {
    const obj = {
      products: 'Home de Productos',
      coexistence: 'Convivencia',
      current_account: 'Cuenta Corriente',
      deposit_account: 'Cuenta de Ahorro',
      credit_card: 'Tarjeta de Crédito',
      credit: 'Créditos',
      cdt: 'CDT',
      free_destination: 'Libre Destino',
      to_plus: 'Tu Plus',
      product_actions: 'Acciones Aval',
      order_of_payment: 'Libranza',
      btn_saving: 'Card de Cuenta de ahorro',
      btn_cdt: 'Card de CDT',
      btn_credit_card: 'Card de Tarjeta de Crédito',
      product_detail: 'Detalle de Producto',
      orders_withdrawals: 'Giros y Retiros',
      payment_obligation: 'Pagos Obligación',
      transfer_money: 'Transferencia de Dinero',
      recharge_cellphone: 'Recargas Celular',
      generate_statements: 'Generar Extractos',
      generate_certificates: 'Generar Certificados',
      pockets: 'Bolsillos',
      pay_credit_card: 'Pagos de Tarjeta de Crédito',
      advance: 'Avance',
      pfm: 'Card para PFM',
      last_movements: 'Últimos movimientos',
      organizer: 'Organizador',
      payments: 'Pagos',
      bank_obligation: 'Obligaciones Bancarias',
      public_service: 'Servicios Públicos',
      payment_taxes: 'Pagos de Impuestos',
      payment_stack: 'Pagos Pila',
      payment_history: 'Historial de Pagos',
      transfers: 'Transferencias',
      create: 'Nueva transferencia',
      management: 'Administrar',
      favorite: 'Favoritos',
      edit: 'Editar',
      programmed: 'Programados',
      history: 'Historial de Transferencias',
      indefinite_transfers: 'Transferencias Indefinidas',
      documents: 'Documentos',
      extracts: 'Extractos',
      certificate_product: 'Certificados de Productos',
      certificate_taxes: 'Certificados Tributarios',
      contact: 'Contacto',
      profile: 'Perfil',
      security: 'OPTION_NAV.SECURITY.TITLE',
      card_activate: 'OPTION_NAV.SECURITY.LINK3',
      alert_notifications: 'OPTION_NAV.SECURITY.LINK5',
      two_auth_factor: 'OPTION_NAV.SECURITY.LINK4',
      block_product: 'OPTION_NAV.SECURITY.LINK1',
      change_password: 'OPTION_NAV.SECURITY.LINK2',
      access_control: 'OPTION_NAV.SECURITY.LINK6',
      security_data: 'OPTION_NAV.SECURITY.LINK8',
      verification_methods: 'OPTION_NAV.SECURITY.LINK9',
      biometric_authentication: 'OPTION_NAV.SECURITY.LINK7',
      totp: 'OPTION_NAV.SECURITY.LINK11',
      limit_management: 'OPTION_NAV.SECURITY.LINK12',
      option_card: 'Pestaña Tarjetas',
      option_account: 'Pestaña Cuentas',
      debit_card: 'Tarjetas Débito',
      payment_pse_free_destiny: 'Pago PSE Libre Destino',
      payment_pse_credit_card: 'Pago PSE Tarjeta de Crédito',
      delete_web_auth: 'Eliminar huella',
      default: '',
    };

    const name = !!obj[key] ? obj[key] : obj['default'];

    return name;
  }
}
