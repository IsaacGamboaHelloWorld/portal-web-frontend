import { IGenericState } from '@app/core/interfaces/generic-state.interface';
import { ITransferLimitData } from '../../entities/limit-management-create.entity';
import {
  initLimitManagementCreateState,
  initLimitManagementGetState,
} from '../reducers';

export interface ILimitManagementeModuleState {
  create: ILimitManagementCreate;
  get: ILimitManagementGet;
  update: ILimitManagementUpdate;
  delete: ILimitManagementDelete;
}

export const initLimitManagement: ILimitManagementeModuleState = {
  create: initLimitManagementCreateState,
  get: initLimitManagementGetState,
  update: undefined,
  delete: undefined,
};

//#region "Interface State for Create"
export interface ILimitManagementCreate extends IGenericState {
  data: ILimitManagementCreateData;
}

export interface ILimitManagementCreateData {
  statusDescription: string;
  statusCode: string;
}
//#endregion "Interface State for Create"

//#region "Interface State for Get"
export interface ILimitManagementGet extends IGenericState {
  data: ILimitManagementGetData;
}

export interface ILimitManagementGetData {
  limits: ITransferLimitData; // Topes configurados por el usuario ( Autogestion-Topes )
  limitsBank: ITransferLimitData; // Topes de negocio, establecidos por Banco ( Labels )
  firstTime: boolean;
  channel: string;
}
//#endregion "Interface State for Get"

//#region "Interface State for Update"
export interface ILimitManagementUpdate extends IGenericState {
  data: ILimitManagementCreateData;
}
//#endregion "Interface State for Delete"

export interface ILimitManagementDelete extends IGenericState {
  data: ILimitManagementCreateData;
}
//#endregion "Interface State for Delete"
