import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ObjectOptionEnum } from '@app/core/constants/navigate-option-enum';

export function mapOptionToNavigate(option: string): INavigate {
  const obj = {
    // Security Module
    [ObjectOptionEnum.SECURITY_DATA]: null,
    [ObjectOptionEnum.VERIFICATION_METHODS]: null,
    [ObjectOptionEnum.AUTH_2FACTHOR]: Navigate.code_auth,
    [ObjectOptionEnum.ALERTS_AND_NOTIFICATIONS]: Navigate.alerts,
    [ObjectOptionEnum.ACTIVATE_CARD]: Navigate.acivation_tc,
    [ObjectOptionEnum.CHANGE_PASSWORD]: Navigate.change_password,
    [ObjectOptionEnum.BLOCK_PRODUCT]: Navigate.blocked,
    [ObjectOptionEnum.BIOMETRIC_AUTHENTICATION]:
      Navigate.biometric_authentication,
    [ObjectOptionEnum.ACCESS_CONTROL]: Navigate.access_control,
    [ObjectOptionEnum.CHANNEL_BLOCK]: Navigate.access_control,
    [ObjectOptionEnum.TOTP_AUTHENTICATION]: Navigate.totp_autentication,
    [ObjectOptionEnum.LIMIT_MANAGEMENT]: Navigate.limit_management,
    // Document Module
    [ObjectOptionEnum.EXTRACTS]: Navigate.documents_extracts_ds,
    [ObjectOptionEnum.CERTIFICATE]: Navigate.documents_certificates_ds,
    [ObjectOptionEnum.TRIBUTARY]: Navigate.documents_tributaries,
  };
  const path = obj[option];
  return path;
}

export function createNavigateObject(
  internalNavigate: any,
  mainNavigate: any = '',
): any {
  const entries = Object.entries(internalNavigate);
  let clone = {};
  entries.forEach((entry: any[]) => {
    clone = {
      ...clone,
      [entry[0]]: `${mainNavigate}/${entry[1]}`,
    };
  });
  return clone;
}
