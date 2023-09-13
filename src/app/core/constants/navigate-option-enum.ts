export enum NavigateOptionEnum {
  // Security module
  SECURITY_DATA = 'Datos de seguridad',
  VERIFICATION_METHODS = 'Métodos de verificación',
  ALERTS_AND_NOTIFICATIONS = 'Alertas y notificaciones',
  ACTIVATE_CARD = 'Activar tarjetas',
  CHANGE_PASSWORD = 'Cambiar contraseña',
  BLOCK_PRODUCT = 'Bloquear productos',
  BIOMETRIC_AUTHENTICATION = 'Autenticación biométrica',
  TOTP_AUTHENTICATION = 'Autenticación TOTP',
  ACCESS_CONTROL = 'Control de acceso',
  CHANNEL_BLOCK = 'Bloqueo de canal',
  AUTH_2FACTHOR = 'Autenticación en 2 pasos',
  UNUSUAL_OPERATIONS = 'Operaciones Inusuales',
  LIMIT_MANAGEMENT = 'Administración de topes',
  // Documents module
  EXTRACTS = 'Extractos',
  CERTIFICATE = 'Certificados de productos',
  TRIBUTARY = 'Certificados tributarios',
  // Tributary
  TAX_RET_SOURCE = 'Retención en la fuente',
  TAX_RAC = 'Reporte anual de costos',
  TAX_GMF = 'GMF',
  TAX_TC = 'Declaración de renta TC',
}

export enum ObjectOptionEnum {
  // Security module
  SECURITY_DATA = 'security_data',
  VERIFICATION_METHODS = 'verification_methods',
  ALERTS_AND_NOTIFICATIONS = 'alert_notifications',
  ACTIVATE_CARD = 'card_activate',
  CHANGE_PASSWORD = 'change_password',
  BLOCK_PRODUCT = 'block_product',
  BIOMETRIC_AUTHENTICATION = 'biometric_authentication',
  TOTP_AUTHENTICATION = 'totp',
  ACCESS_CONTROL = 'access_control',
  CHANNEL_BLOCK = 'access_control',
  AUTH_2FACTHOR = 'two_auth_factor',
  UNUSUAL_OPERATIONS = 'unusual_operations',
  LIMIT_MANAGEMENT = 'limit_management',
  // Documents module
  EXTRACTS = 'extracts',
  CERTIFICATE = 'certificate_product',
  TRIBUTARY = 'certificate_taxes',
  // Tributary
  TAX_RET_SOURCE = 'tax_document_ret_source',
  TAX_RAC = 'tax_document_rac',
  TAX_GMF = 'tax_document_gmf',
  TAX_TC = 'tax_document_tc',
}
