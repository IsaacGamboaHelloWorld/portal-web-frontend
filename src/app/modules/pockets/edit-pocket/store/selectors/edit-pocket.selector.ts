import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEditPocketModuleState } from '../../entities/edit-pocket';
import {
  EditPocketFeatureName,
  EditPocketModuleState,
} from '../state/edit-pocket-module.state';

export const EditPocketRootSelector = createFeatureSelector<
  IEditPocketModuleState
>(EditPocketFeatureName);

export const ActivePocketRootSelector = createFeatureSelector<
  EditPocketModuleState
>(EditPocketFeatureName);

export const selectEditedPocket = createSelector(
  ActivePocketRootSelector,
  (state: EditPocketModuleState) => state.editPocket,
);

export const selectDeletedPocket = createSelector(
  ActivePocketRootSelector,
  (state: EditPocketModuleState) => state.deletePocket,
);

export const selectCategories = createSelector(
  EditPocketRootSelector,
  (state: IEditPocketModuleState) => state.categories,
);
