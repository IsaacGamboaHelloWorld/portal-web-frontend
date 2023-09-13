export enum Navigate {
  loginRF = '/loginRF',
  login = '/login',
  home = '/',
  induction = '/induccion',
  enrollment = '/login/enrolamiento',
  enrollmentRF = '/loginRF/enrolamientoRF',
  transfer = '/transferencia',
  paymentsOld = '/pagosOld',
  paymentsv2 = '/pagos',
  paymentsv2services = '/pagos/servicios',
  paymentsv2enrollservice = '/pagos/servicios/inscribir-servicio',
  paymentsv2payservice = '/pagos/servicios/pagar',
  paymentsv2registeredSP = '/pagos/servicios/servicio-inscrito',
  paymentsv2obligations = '/pagos/ob-bancaria',
  paymentsv2enrollloan = '/pagos/ob-bancaria/inscribir-obligacion',
  paymentsv2payloan = '/pagos/ob-bancaria/pagar',
  paymentsv2registeredOB = '/pagos/ob-bancaria/obligacion-inscrita', // TO-DO Revisar nombre url!!
  paymentsv2payForPse = '/pagos/ob-bancaria/pse',
  blocked = '/bloqueos',
  detail = '/detalle/',
  detailPFM = '/detallePFM',
  extracts = '/extractos/',
  type_payment = '/pagos/tipo-pago',
  new_payment = '/pagos/nuevo-pago',
  payment_list = '/pagos/pagos-inscritos',
  new_public_payment = '/pagos/nuevo-pago-publico',
  new_transfer = '/transferencia/nueva-transferencia',
  new_transfer_how = '/transferencia/nueva-transferencia/por-cuanto',
  fast_transfer_other_accounts = '/transferencia/transferencia-rapida',
  confirmation = '/confirmacion',
  to_who = '/a-quien',
  how_much = '/por-cuanto',
  when = '/cuando',
  transfer_success = '/transferencia-exitosa',
  payment_success_public = '/pago-publico-exitoso',
  payment_success_normal = '/pago-normal-exitoso',
  wnocandother = '/giros/tipo',
  transfer_pending = '/transferencia-pendiente',
  user_profile = '/perfil',
  contact = '/contacto',
  open_offers_products = '/apertura-productos',
  recharge_phone = '/recargas/recargar',
  pockets = '/bolsillos',
  payment_taxes = '/pagos-impuestos/a-quien',
  acivation_tc = '/activar-tarjeta/crear',
  registered_product_affiliations = 'transferencia/cuentas-inscritas',
  new_product_affiliation_for_transfers = '/transferencia/cuentas-inscritas/inscribir',
  code_auth = '/codigo-2fa/inicio',
  change_password = '/cambiar-password',
  pay_stack = '/pago-pila',
  documents = '/documentos',
  documents_extracts = '/documentos/extractos',
  documents_certificates = '/documentos/certificados-productos',
  documents_tributaries = '/documentos/certificados-tributarios',
  documents_ds = '/documentos-ds',
  documents_extracts_ds = '/documentos-ds/extractos',
  documents_certificates_ds = '/documentos-ds/certificados-productos',
  documents_tributaries_ds = '/documentos-ds/certificados-tributarios',
  alerts = '/alertas-y-notificaciones',
  alerts_create = '/alertas-y-notificaciones/crear-alerta',
  alerts_home = '/alertas-y-notificaciones/mis-alertas',
  your_plus = '/tu-plus',
  your_plus_how = '/tu-plus/como',
  security = '/seguridad',
  access_control = '/seguridad/control-acceso',
  biometric_authentication = '/biometrico/home',
  unusuales_operations = '/operaciones-inusuales',
  totp_autentication = '/totp',
  limit_management = '/seguridad/administracion-topes',
  organizer = '/tu-organizador',
}

export interface INavigate {
  login: string;
  loginRF: string;
  home: string;
  induction: string;
  enrollment: string;
  enrollmentRF: string;
  transfer: string;
  paymentsOld: string;
  paymentsv2: string;
  paymentsv2services: string;
  paymentsv2enrollservice: string;
  paymentsv2payservice: string;
  paymentsv2registeredSP: string;
  paymentsv2obligations: string;
  paymentsv2enrollloan: string;
  paymentsv2payloan: string;
  paymentsv2registeredOB: string;
  paymentsv2payForPse: string;
  blocked: string;
  detail: string;
  detailPFM: string;
  extracts: string;
  type_payment: string;
  payment_list: string;
  new_payment: string;
  new_public_payment: string;
  new_transfer: string;
  new_transfer_how: string;
  fast_transfer_other_accounts: string;
  to_who: string;
  how_much: string;
  when: string;
  transfer_success: string;
  transfer_pending: string;
  wnocandother: string;
  user_profile: string;
  contact: string;
  open_offers_products: string;
  recharge_phone: string;
  payment_success_public: string;
  payment_success_normal: string;
  pockets: string;
  payment_taxes: string;
  acivation_tc: string;
  registered_product_affiliations: string;
  new_product_affiliation_for_transfers: string;
  code_auth: string;
  change_password: string;
  pay_stack: string;
  documents: string;
  documents_extracts: string;
  documents_certificates: string;
  documents_tributaries: string;
  documents_ds: string;
  documents_extracts_ds: string;
  documents_certificates_ds: string;
  documents_tributaries_ds: string;
  alerts: string;
  alerts_create: string;
  alerts_home: string;
  your_plus: string;
  security: string;
  access_control: string;
  biometric_authentication: string;
  unusuales_operations: string;
  totp_autentication: string;
  limit_management: string;
  organizer: string;
}

export enum Titles {
  confirmation = 'confirmación',
  to_who = '¿A quién?',
  how_much = '¿Por cuánto?',
  when = '¿Cuándo?',
  transfer_success = 'Transacción Exitosa',
  payment_success_public = 'Pago publico exitoso',
  payment_success_normal = 'Pago normal exitoso',
  transfer_pending = 'Transacción pendiente',
}
