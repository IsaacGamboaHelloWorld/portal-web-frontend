import { createReducer, on } from '@ngrx/store';
import { NavigateSecurity } from '../../constants/navigate-security';
import { SetStepAccessControl } from '../actions/step.actions';
import { ResetStepAccessControl } from './../actions/step.actions';

export const initStepAccessControl: NavigateSecurity =
  NavigateSecurity.access_control;

export const stepGetAccessControlReducer = createReducer(
  initStepAccessControl,
  on(SetStepAccessControl, (_state, { navigate }) => navigate),
  on(ResetStepAccessControl, (_state) => initStepAccessControl),
);
