import { IGenericState } from '@app/core/interfaces/generic-state.interface';
import { IDeviceItem } from '../../entities/totp-response.interface';
import { initTotpDelete } from '../reducers/totp-delete.reducers';
import { initTotpDevices } from '../reducers/totp-devices.reducers';
import { initTotpGenerate } from '../reducers/totp-generate.reducers';
import { initTotpRegister } from '../reducers/totp-register.reducers';

export const TotpFeatureName = 'totpModuleState';

export interface ITotpModuleState {
  generate: ITotpGenerate;
  register: ITotpRegister;
  devices: ITotpDevices;
  deleteTotp: ITotpDelete;
}

export const initTotpState: ITotpModuleState = {
  generate: initTotpGenerate,
  register: initTotpRegister,
  devices: initTotpDevices,
  deleteTotp: initTotpDelete,
};

export interface ITotpGenerate extends IGenericState {
  data: ITotpGenerateData;
}

export interface ITotpRegister extends IGenericState {
  data: ITotpRegisterData;
}

export interface ITotpDevices extends IGenericState {
  data: ITotpDevicesData;
}

export interface ITotpDelete extends IGenericState {
  data: ITotpDeleteData;
}

export interface ITotpGenerateData {
  qr: string;
  id: string;
  secret: string;
}

export interface ITotpRegisterData {
  success: boolean;
}

export interface ITotpDevicesData {
  algorithm: string;
  length: number;
  period: string;
  devices: IDeviceItem[];
}
export interface ITotpDeleteData {
  success: boolean;
}
