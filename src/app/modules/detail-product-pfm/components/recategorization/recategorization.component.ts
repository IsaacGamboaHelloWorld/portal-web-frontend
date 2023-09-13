import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { IDsDropDown } from '@app/shared/ds/ds-dropdown-select/constants/ds-dropdown-interface';
import { formattMonthToName } from '@app/shared/helpers/datePFM.helper';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  IOptionExpensesTabs,
  optionTabsExpensesEnum,
} from '../../constans/tabs-options.enum';
import { DetailProductPFMModel } from '../../detail-product-pfm.model';
import {
  PfmItemCategory,
  PfmMovimentRequest,
  PfmRecategorizeRequest,
  TapOptionExpensesPfm,
} from '../../entities';
import {
  IPfmExpensesState,
  IPfmItemsState,
  IPfmMovimentsState,
  IPfmRecategorizeState,
} from '../../store';

@Component({
  selector: 'app-recategorization',
  templateUrl: './recategorization.component.html',
  styleUrls: ['./recategorization.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecategorizationComponent implements OnInit, OnDestroy {
  public dateFormatted: string = '';
  public optionTabs: TapOptionExpensesPfm[] = [
    {
      id: optionTabsExpensesEnum.expenses,
      label: optionTabsExpensesEnum.expenses,
    },
    {
      id: optionTabsExpensesEnum.expensesManually,
      label: optionTabsExpensesEnum.expensesManually,
    },
  ];
  public tabSelected: TapOptionExpensesPfm;
  public total: number;
  public idProduct: string;

  public form: FormGroup;
  public nameItemForm: string = 'item';

  public movimentsSelected: string[] = [];
  public title: string = '';

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _location: Location,
    private _model: DetailProductPFMModel,
    private _dom: ManipulateDomService,
  ) {
    this.tabSelected = this.optionTabs[0];
  }

  ngOnInit(): void {
    this._setupDom(true);
    this._fetchMoviments();
    this._model.fetchItemsPfm({ type: 'D' });
    this._model.isFirstTime(false);
    this._initForm();
    this._subsRecategorization();
  }

  ngOnDestroy(): void {
    this._setupDom(false);
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      [this.nameItemForm]: new FormControl('', Validators.required),
    });
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this._dom.addClass(
        '.main-container-transaction',
        'changes-styles-reca-pfm',
      );
    } else {
      this._dom.removeClass(
        '.main-container-transaction',
        'changes-styles-reca-pfm',
      );
    }
  }

  private _fetchMoviments(): void {
    const state = this._location.getState() as PfmMovimentRequest;
    if (!state) {
      return;
    }
    this.dateFormatted = `${formattMonthToName(state.month, true)} ${
      state.year
    }`;
    this.total = state.total;
    this.idProduct = state.idProduct;
    this._model.pfmMovimentsLoad(state);
    this.title = state.name;
  }

  private _subsRecategorization(): void {
    this.pfmRecategorizarion$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._responseRecategorization.bind(this));
  }

  private _responseRecategorization(state: IPfmRecategorizeState): void {
    if (!state.data) {
      return;
    }

    if (state.data) {
      this._location.back();
    }
  }

  public tabOptionChange(event: any): void {
    const { detail } = event;
    this.tabSelected = detail;
  }

  public selectedChanges(event: CustomEvent<string[]>): void {
    this.movimentsSelected = event.detail;
  }

  public cancelRecategorization(): void {
    this.movimentsSelected = [];
  }

  public moveRecategorization(): void {
    const { value } = this.itemFormAlias;
    const transactions = this.movimentsSelected.map((val: string) => ({
      id: val,
    }));

    const request: PfmRecategorizeRequest = {
      transactions,
      idCategory: value,
    };
    this._model.fetchRecategorizationPfm(request);
  }

  get pfmMoviments$(): Observable<IPfmMovimentsState> {
    return this._model.pfmMoviments$;
  }

  get pfmItems$(): Observable<IPfmItemsState> {
    return this._model.pfmItems$;
  }

  get pfmRecategorizarion$(): Observable<IPfmRecategorizeState> {
    return this._model.pfmRecategorizarion$;
  }

  get total$(): Observable<number> {
    return this.pfmExpenses$.pipe(
      map((x) => {
        if (!x || !x.data || !x.data.products || !x.data.products.length) {
          return 0;
        }
        return x.data.products.find((i) => i.accountNumber === this.idProduct)
          .expenses.total;
      }),
    );
  }

  get pfmItemsOptions$(): Observable<IDsDropDown[]> {
    return this.pfmItems$.pipe(map(this._mapItems.bind(this)));
  }

  get pfmExpenses$(): Observable<IPfmExpensesState> {
    return this._model.pfmExpenses$;
  }

  private _mapItems(state: IPfmItemsState): IDsDropDown[] {
    if (!!state && !!state.data) {
      return state.data
        .map((data: PfmItemCategory) => ({
          value: data.code,
          label: data.name,
        }))
        .sort((a: IDsDropDown, b: IDsDropDown) => {
          if (a.label > b.label) {
            return 1;
          } else if (a.label < b.label) {
            return -1;
          } else {
            return 0;
          }
        });
    }
  }

  get getTabs(): IOptionExpensesTabs {
    return optionTabsExpensesEnum;
  }

  get itemFormAlias(): AbstractControl {
    return this.form.get(this.nameItemForm);
  }
}
