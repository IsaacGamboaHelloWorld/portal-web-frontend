import * as fromCategories from '@store/actions/models/categories/categories.action';

export interface ICategories {
  data: string[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCategories: ICategories = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
};

export function CategoriesReducer(
  state: ICategories = initCategories,
  action: fromCategories.actions,
): ICategories {
  switch (action.type) {
    case fromCategories.LOAD_CATEGORIES:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };

    case fromCategories.SUCCESS_CATEGORIES:
      return {
        data: (action as fromCategories.SuccessCategoriesAction).categories,
        loaded: true,
        loading: false,
        error: false,
      };

    case fromCategories.ERROR_CATEGORIES:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };

    default:
      return state;
  }
}
