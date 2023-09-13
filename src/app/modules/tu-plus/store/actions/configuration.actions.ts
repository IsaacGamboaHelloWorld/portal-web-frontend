import { createAction, props } from '@ngrx/store';
import { IResConfiguration } from '../../entities/configuration.interface';

const enum TypeActionsConfiguration {
  LOAD = '[CONFIGURATION / API] Configuration Load',
  FAIL = '[CONFIGURATION / API] Configuration Fail',
  SUCCESS = '[CONFIGURATION / API] Configuration Success',
  RESET = '[CONFIGURATION / API] Configuration Reset',
}

export const ConfigurationActionLoad = createAction(
  TypeActionsConfiguration.LOAD,
  props<{ Type: string }>(),
);

export const ConfigurationActionSuccess = createAction(
  TypeActionsConfiguration.SUCCESS,
  props<{ data: IResConfiguration }>(),
);

export const ConfigurationActionFail = createAction(
  TypeActionsConfiguration.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage: string;
    errorMessageCode: number;
  }>(),
);

export const ConfigurationActionReset = createAction(
  TypeActionsConfiguration.RESET,
);
