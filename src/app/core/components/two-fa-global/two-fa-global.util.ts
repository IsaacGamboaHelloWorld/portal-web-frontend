export enum Errors2FA {
  ERROR_DESC = 'El usuario no tiene un segundo factor de autenticación configurado',
  ERROR = 'Ha ocurrido un error intentado procesar el segundo factor de autentacion. Por favor, intenta mas tarde.',
}
export interface IErrors2FA {
  ERROR_DESC: string;
  ERROR: string;
}
