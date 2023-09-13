import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { FilterDateComponent } from '@modules/detail-product/components/filter-date/filter-date.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { INavigate, Navigate } from '../../../../core/constants/navigate';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { downloadFileWithJS } from '../../../../shared/helpers/downloadFile.helpers';
import { validateEmpty } from '../../../../shared/helpers/validateData.helper';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { MovementFilterState } from '../../../../store/reducers/models/movements/filterMovement.reducer';
import { MovementsState } from '../../../../store/reducers/models/movements/movement.reducer';
import { SecurityService } from '../../../security/services/security.service';
import { DATE_FILTER } from '../../constants/filter';
import { DetailProductModel } from '../../detail-product.model';
import {
  MovementsFileResponse,
  MovementsFileState,
} from '../../entities/movements-file';
import { SearchTextMovementPipe } from '../../pipes/search-text-movement/search-text-movement.pipe';

@Component({
  selector: 'app-smart-movements',
  templateUrl: './smart-movements.component.html',
  styleUrls: ['./smart-movements.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartMovementsComponent implements OnInit {
  @Input() cdtInfo: any;
  public account: { type: string; id: string } = { type: '', id: '' };
  public filterAvailable: boolean;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public isCDT: boolean = false;
  public filterState: boolean = false;
  public emptyState: boolean = true;
  public textFilter: string = '';

  constructor(
    private route: ActivatedRoute,
    private dom: ManipulateDomService,
    private router: Router,
    private modalService: ModalService,
    private model: DetailProductModel,
    private security: SecurityService,
    private searchTextPipe: SearchTextMovementPipe,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
    this.route.params
      .subscribe((params: { type: string; id: string }) => {
        if (!isNullOrUndefined(params.type) && !isNullOrUndefined(params.id)) {
          this.security.decryptAesGcm(params.id).then((data) => {
            this.account.type = params.type;
            this.account.id = data;
            this.model.fetchMovement(params.type, data);
            this.model.saveInfoMovement(params.type, data);
            this.isCDT = 'certified_deposit_term' === params.type;
          });
        }
      })
      .unsubscribe();
    this._closeModal();
  }

  get isSafari(): boolean {
    return this.dom.isSafari();
  }

  get movements$(): Observable<MovementsState> {
    return this.model.movement$.pipe(
      map((data: MovementsState) => {
        if (
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.account) &&
          !isNullOrUndefined(data.account.operations)
        ) {
          const operationsFiltered = this.searchTextPipe.transform(
            data.account.operations,
            this.textFilter,
          );

          const result = {
            ...data,
            account: {
              ...data.account,
              operations: operationsFiltered,
            },
          };

          return result;
        }
        return data;
      }),
    );
  }

  get movementsFile$(): Observable<MovementsFileResponse> {
    return this.model.movementsFileResponse$;
  }

  get movementsFileState$(): Observable<MovementsFileState> {
    return this.model.movementsFileState$;
  }

  get hasMovements$(): Observable<boolean> {
    return this.movements$.pipe(
      map((data: MovementsState) => {
        this.filterAvailable =
          !isNullOrUndefined(data) && !isNullOrUndefined(data.account);
        return (
          this.isCDT ||
          (!isNullOrUndefined(data) &&
            !isNullOrUndefined(data.account) &&
            (!isNullOrUndefined(data.account.operations) ||
              !isNullOrUndefined(data.account.creditCardMovements)))
        );
      }),
    );
  }

  get hasFilter$(): Observable<boolean> {
    return this.model.movementFilter$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.typeFilter) &&
          data.typeFilter !== '',
      ),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get filterInfo$(): Observable<MovementFilterState> {
    return this.model.movementFilter$;
  }

  get isDate$(): Observable<boolean> {
    return this.filterInfo$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.typeFilter) &&
          data.typeFilter === DATE_FILTER,
      ),
    );
  }

  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
  }

  public doDownloadFile(): void {
    this.filterInfo$
      .subscribe((data) => {
        const dataRequest: any = {
          type: this.account.type,
          id: this.account.id,
          from: validateEmpty(data.from, ''),
          to: validateEmpty(data.to, ''),
        };
        this.model.fetchMovementsFile(dataRequest);
      })
      .unsubscribe();
  }

  public doDownloadFileFromStore(): void {
    this.model.movementsFileResponse$
      .subscribe((data: MovementsFileResponse) => {
        downloadFileWithJS(data.base64, data.name, 'xlsx');
      })
      .unsubscribe();
  }

  public openFilter(): void {
    this.modalService.open(FilterDateComponent, true, `${DEFAULT_WIDTH}`);
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

  public fetchMovement(): void {
    if (
      !isNullOrUndefined(this.account) &&
      !isNullOrUndefined(this.account.id)
    ) {
      this.filterInfo$
        .subscribe((data) => {
          this.model.fetchMovement(
            this.account.type,
            this.account.id,
            validateEmpty(data.from, ''),
            validateEmpty(data.to, ''),
          );
        })
        .unsubscribe();
    }
  }

  public removeFilter(): void {
    this.model.resetMovements();
    this.model.resetMovement();
    this.model.resetFilter();
    this.fetchMovement();
  }

  private _closeModal(): void {
    this.router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this.modalService.close();
      });
  }
}
