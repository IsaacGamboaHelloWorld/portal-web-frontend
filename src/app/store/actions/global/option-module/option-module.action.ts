import { ResponseOptionModule } from '@app/core/interfaces/option-module.interface';
import { createAction, props } from '@ngrx/store';

export const OPTION_LOAD = '[OPTION MODULE] - Data Load';
export const OPTION_SUCCESS = '[OPTION MODULE] - Data Success';
export const OPTION_FAIL = '[OPTION MODULE] - Data Fail';
export const OPTION_RESET = '[OPTION MODULE] - Data Reset';

export const OptionModuleLoadAction = createAction(OPTION_LOAD);
export const OptionModuleSuccessAction = createAction(
  OPTION_SUCCESS,
  props<ResponseOptionModule>(),
);
export const OptionModuleFailAction = createAction(
  OPTION_FAIL,
  props<{ errorMessage: string; specificErrorMessage: string }>(),
);
export const OptionModuleResetAction = createAction(OPTION_RESET);
