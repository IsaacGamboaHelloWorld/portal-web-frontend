import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyFuncionality',
})
export class KeyFuncionalityPipe implements PipeTransform {
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
      security: 'Seguridad',
      card_activate: 'Activar Tarjeta',
      alert_notifications: 'Alerta y notificaciones',
      two_auth_factor: 'Autenticación de 2 Pasos',
      block_product: 'Bloquear Productos',
      change_password: 'Cambiar Contraseña',
      access_control: 'Control de Acceso',
      security_data: 'Datos de Seguridad',
      verification_methods: 'Métodos de Verificación',
      biometric_authentication: 'Autenticación Biometrica',
      totp: 'Autenticación TOTP',
      option_card: 'Pestaña Tarjetas',
      option_account: 'Pestaña Cuentas',
      debit_card: 'Tarjetas Débito',
      payment_pse_free_destiny: 'Pago PSE Libre Destino',
      payment_pse_credit_card: 'Pago PSE Tarjeta de Crédito',
      default: '',
    };

    const name = !!obj[key] ? obj[key] : obj['default'];

    return name;
  }
}
