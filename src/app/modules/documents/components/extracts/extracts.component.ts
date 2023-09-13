import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { Product } from '@app/core/models/products/product';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { INavigateDocuments, NavigateDocuments } from '../../entities/routes';
import { DocumentsService } from '../../services/documents.service';
import { ExtractsModel } from '../../store/model/extracts.model';
import { HomeModelDocuments } from '../../store/model/home.model';

@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [TypeCreditCardPipe],
})
export class ExtractsComponent implements OnInit, OnDestroy {
  public formExtracts: FormGroup;
  public loading: boolean = false;
  public typeActive: any;
  public select: object[] = [];
  public again: boolean = false;
  public iconColorLeft: boolean = false;
  public iconColorRight: boolean = false;
  public viewNotFound: boolean;
  public subscribe: Subscription = new Subscription();
  @ViewChild('scroll', null) public scroll: ElementRef;
  constructor(
    private model: ExtractsModel,
    private pipeCreditCard: TypeCreditCardPipe,
    private service: DocumentsService,
    private _facade: HomeModelDocuments,
    private _translate: TranslateService,
  ) {}

  get navigate2(): INavigateDocuments {
    return NavigateDocuments;
  }
  get navigate(): INavigate {
    return Navigate;
  }
  get products(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD ||
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
    );
  }

  get periodsData$(): Observable<IPeriodItem[]> {
    return this.model.statePeriodsEstracts$.pipe(
      map((data) => {
        if (
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.periods.length) &&
          data.periods.length
        ) {
          this.viewNotFound = false;
          return data.periods;
        }
      }),
    );
  }

  @HostListener('scroll', ['$event']) scrollHandler(e: Event): void {
    const pos =
      this.scroll.nativeElement.scrollLeft +
      this.scroll.nativeElement.offsetWidth;
    const max = this.scroll.nativeElement.scrollWidth;
    this.iconColorLeft = true;
    if (pos === this.scroll.nativeElement.offsetWidth) {
      this.iconColorLeft = false;
    }
    this.iconColorRight = false;
    if (pos === max) {
      this.iconColorRight = true;
    }
  }
  ngOnDestroy(): void {
    this.model.reset();
    this.select = [];
  }

  ngOnInit(): void {
    this._initForm();
  }

  public _initForm(): void {
    this.formExtracts = new FormGroup({
      optionCertificate: new FormControl('', [Validators.required]),
      period: new FormControl('', [Validators.required]),
      nameOptional: new FormControl({ value: '', disabled: true }),
    });
  }

  public setOptionsSelect(): void {
    this.periodsData$.subscribe((data) => {
      if (data && data.length) {
        this.select = [];
        this.viewNotFound = false;
        data.forEach((e) => {
          const fch = new Date(e.startDate);
          const year = fch.getFullYear();
          this.select = [
            ...this.select,
            { label: `${e.periodName} - ${year}`, value: e },
          ];
        });
        this.formExtracts.controls.period.setValue(
          this.select.length ? this.select[0]['value'] : null,
        );
      } else {
        this.viewNotFound = true;
      }
    });
  }

  public download(): void {
    this.loading = true;
    this.model.creationSucces(
      this.typeActive['accountIdentifier'],
      this.typeActive['productType'],
      this.formExtracts.value.period,
    );
    this.subscribe = this.model.stateEstracts$.subscribe((data: IPdfdata) => {
      if (
        this.service.downloadPDF(
          data.base64,
          data.base64 ? true : false,
          '',
          `${this._translate.instant(
            `PRODUCT_TYPES.${this.typeActive['productType']}`,
          )}${String(this.typeActive['accountIdentifier']).slice(-4)}`,
        )
      ) {
        this.typeActive = null;
        this._facade.notificationOpen(
          this._translate.instant('DOCUMENTS.EXTRACTS.DETAIL.SUCCESS'),
          true,
          ClassNotification.SUCCESS,
        );
        this.loading = false;
        this.again = false;
        this._initForm();
        this.subscribe.unsubscribe();
      }
      if (data.type) {
        this.again = true;
        this.loading = false;
      }
    });
  }

  public setBorder(value: object): void {
    this.typeActive = value;
    this.formExtracts.controls.optionCertificate.setValue(this.typeActive);
    this.model.creationPeriodsSucces(
      this.typeActive['accountIdentifier'],
      this.typeActive['productType'],
    );
    this.setOptionsSelect();
  }

  public onLeft(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft - 215,
      behavior: 'smooth',
    });
  }

  public onRight(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft + 215,
      behavior: 'smooth',
    });
  }

  public selectPeriod(event: string): void {
    this.formExtracts.controls.period.setValue(event);
  }

  public setImg(tipeAccount: string, idAccount?: string): string {
    switch (tipeAccount) {
      case TYPE_ACCOUNTS.CREDIT_CARD:
        return this.pipeCreditCard.transform(idAccount)['img'];
      case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT:
        return '';
      case TYPE_ACCOUNTS.CURRENT_ACCOUNT:
        return '';
    }
  }
}
