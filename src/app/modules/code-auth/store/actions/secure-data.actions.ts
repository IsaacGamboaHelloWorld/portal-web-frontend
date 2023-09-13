import { createAction } from '@ngrx/store';

const enum TypeActionsAssign {
  SAVE = '[SAVE INFO SECURE DATA / API] Save SecureData Update Information',
  RESET = '[RESET INFO SECURE DATA / API] Reset SecureData Update Information',
}

export const SecureDataSave = createAction(
  TypeActionsAssign.SAVE,
  (securePhone: string, secureEmail: string, contactPreference: string) => ({
    securePhone,
    secureEmail,
    contactPreference,
  }),
);
export const SecureDataReset = createAction(TypeActionsAssign.RESET);
