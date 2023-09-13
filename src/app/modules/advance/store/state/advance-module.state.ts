import { IFormGlobal } from '@modules/advance/entities/form-global';
import {
  initTransferAdvance,
  ITransferAdvance,
} from '@modules/advance/store/reducers/transfer-advance.reducer';
import { initFormGlobal } from '../reducers/form-global.reducer';

export const AdvanceFeatureName = 'AdvanceModuleState';

export type AdvanceModuleState = Readonly<{
  formGlobal: IFormGlobal;
  transferAdvance: ITransferAdvance;
}>;

export const initAdvance: AdvanceModuleState = {
  formGlobal: initFormGlobal,
  transferAdvance: initTransferAdvance,
};
