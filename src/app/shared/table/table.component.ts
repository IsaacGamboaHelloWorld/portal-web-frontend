import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { GenericConfiguration } from '@app/core/interfaces/generic-configuration';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ManipulateDomService } from '../../core/services/manipulate-dom/manipulate-dom.service';
import { checkNested } from '../helpers/checkNested.helper';
import { DEFAULT_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';
import { DEFAULT_RANGE, MAX_ITEMS } from './constants/filter';
import { FilterDateComponent } from './shared/filterDate/filterDate.component';
import { FilterDateModel, StartDateEndDateModel } from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() movements: GenericConfiguration;
  @Input() showDownload: boolean = false;
  @Input() showFilterDate: boolean = false;
  @Input() optionFilter: string;
  @Input() isFilter: boolean = false;

  @Input() option: string;
  @Input() typeAccount: string;
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;

  @Input() maxRange: number = DEFAULT_RANGE;

  @Output() actionEvent: EventEmitter<object> = new EventEmitter<object>();

  public filterDateModel: FilterDateModel;

  public currentPage: number = 1;
  public dataToPage: any[] = [];
  public filterState: boolean = false;
  public emptyState: boolean = true;

  public totalRecords: number = 0;
  public textFilter: string = '';
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _maxItems: number = MAX_ITEMS;

  constructor(private modal: ModalService, private dom: ManipulateDomService) {}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.movements)) {
      this.cutArray(this._maxItems, this.currentPage);
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.cutArray(this._maxItems, this.currentPage);
  }

  get isSafari(): boolean {
    return this.dom.isSafari();
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.cutArray(this._maxItems, this.currentPage);
  }

  public cutArray(howMany: number, page_number: number): void {
    page_number--;
    const list: any[] = this.movements.data;

    if (!isNullOrUndefined(list) && list.length > 0) {
      this.dataToPage = list.slice(
        page_number * howMany,
        (page_number + 1) * howMany,
      );
    }
  }

  get haveLess(): boolean {
    return this.currentPage === 1;
  }

  get haveMore(): boolean {
    return this.currentPage === this.totalPages;
  }

  get hasMovements(): boolean {
    return !isNullOrUndefined(this.movements);
  }

  get totalPages(): number {
    const _totalPageOp = Math.ceil(this.totalRecords / this._maxItems);
    return this.currentPage > _totalPageOp ? this.currentPage : _totalPageOp;
  }

  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
  }

  public doDownloadFile(): void {
    //
  }

  public openFilter(): void {
    this.modal.open(
      FilterDateComponent,
      true,
      `${DEFAULT_WIDTH}`,
      true,
      this.movements.data,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }
  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modal._dialogComponentRef,
      )
    ) {
      const component = this.modal._dialogComponentRef.instance.componentRef
        .instance;
      component.maxRange = this.maxRange;
      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((filterDateModel: FilterDateModel) => {
          this.filterDateModel = filterDateModel;
          const dates: StartDateEndDateModel = {
            minDate: filterDateModel['from'],
            maxDate: filterDateModel['to'],
          };
          this.actionEvent.emit(dates);
        });
    }
  }

  public openSearchBox(): void {
    this.filterState = !this.filterState;

    if (!this.filterState) {
      this.textFilter = '';
      this.emptyState = true;
    }
  }

  public doClear(event: any): void {
    event.preventDefault();
    this.textFilter = '';
    this.emptyState = true;
  }

  public onChange(event: any): void {
    if (this.textFilter === '') {
      this.emptyState = true;
    }
  }
  get hasErrorMessage$(): boolean {
    return (
      !isNullOrUndefined(this.movements.errorMessage) &&
      this.movements.errorMessage !== ''
    );
  }

  get _dataMovements$(): Observable<any[]> {
    return of(this.movements.data).pipe(
      map((data: any[]) => {
        this.totalRecords = this.countMovements(data);
        return this._filterDataMovements(data);
      }),
    );
  }
  private countMovements(data: any[]): number {
    if (this.optionFilter) {
      return data.filter((movement: any) =>
        movement[this.optionFilter]
          .toLowerCase()
          .includes(this.textFilter.toLowerCase()),
      ).length;
    } else {
      return data.slice(
        (this.currentPage - 1) * this._maxItems,
        this.currentPage * this._maxItems,
      ).length;
    }
  }

  private _filterDataMovements(data: any[]): any[] {
    if (this.optionFilter && data) {
      return data
        .filter((movement: any) =>
          movement[this.optionFilter]
            .toLowerCase()
            .includes(this.textFilter.toLowerCase()),
        )
        .slice(
          (this.currentPage - 1) * this._maxItems,
          this.currentPage * this._maxItems,
        );
    } else {
      return data.slice(
        (this.currentPage - 1) * this._maxItems,
        this.currentPage * this._maxItems,
      );
    }
  }
}
