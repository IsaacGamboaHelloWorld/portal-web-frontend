import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { MovementsFileState } from '../../entities/movements-file';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
  INicknamesState,
} from '../../entities/nicknames';

export const DetailProductFeatureName = 'detailProduct';

export type DetailProductModuleState = Readonly<{
  movementsFileState: MovementsFileState;
  nicknames: INicknamesState;
  nicknamesAll: INicknamesAll;
  nicknamesCreate: IAnswerNicknamesCreate;
  nicknamesDelete: IAnswerNicknamesDelete;
  nicknamesUpdate: IAnswerNicknamesUpdate;
}>;

export const FEATURE_DETAIL_PRODUCT_REDUCER = new InjectionToken<
  ActionReducerMap<DetailProductModuleState>
>('Feature Detail Product Reducer');
