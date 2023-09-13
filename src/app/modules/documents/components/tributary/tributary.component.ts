import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import {
  NavigateOptionEnum,
  ObjectOptionEnum,
} from '@app/core/constants/navigate-option-enum';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { CertificateTaxes } from '@app/core/interfaces/option-module.interface';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { Product } from '@app/core/models/products/product';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IincomeTax, IincomeTaxTC, ITributary } from '../../entities/documents';
import { INavigateDocuments, NavigateDocuments } from '../../entities/routes';
import { IincomeRac, IOptionAssets } from '../../entities/tributary';
import { DocumentsService } from '../../services/documents.service';
import { HomeModelDocuments } from '../../store/model/home.model';
import { TributaryModel } from '../../store/model/tributary.model';
import { IOptionsDownload, OptionsDownload } from './utils.tributary';

@Component({
  selector: 'app-tributary',
  templateUrl: './tributary.component.html',
  styleUrls: ['./tributary.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TributaryComponent implements OnInit, OnDestroy {
  public yearDefault: string = '2021';
  public typeActive: string;
  public formTributary: FormGroup;
  public years: object[] = [];
  public loading: boolean = false;
  public subscribe: Subscription = new Subscription();
  public setWidth: string = '342px';
  public copys: string = this.translate.instant(
    'DOCUMENTS.TRIBUTARY.DETAIL.COPY',
  );
  public options: IOptionAssets[] = [];
  public options$: Observable<IOptionAssets[]> = this.translate.get(
    'DOCUMENTS.TRIBUTARY.DETAIL.OPTIONS',
  );
  constructor(
    private translate: TranslateService,
    private model: TributaryModel,
    private _facade: HomeModelDocuments,
    private _translate: TranslateService,
    private service: DocumentsService,
  ) {}

  get navigate2(): INavigateDocuments {
    return NavigateDocuments;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get optionDownload(): IOptionsDownload {
    return OptionsDownload;
  }

  get stateTributary(): Observable<ITributary> {
    return this.model.stateTributary$;
  }

  get getWidthCont(): string {
    const box: Element = document.querySelector('.cont-options');
    if (OptionsDownload.RENTAL === this.typeActive) {
      return String(box.clientWidth) + 'px';
    }
  }

  ngOnInit(): void {
    this.years = [
      { label: 'Seleccionar...', value: '' },
      { label: '2021', value: '2021' },
      { label: '2020', value: '2020' },
      { label: '2019', value: '2019' },
      { label: '2018', value: '2018' },
    ];
    this._initForm();
  }

  public setBorder(value: string): void {
    this.typeActive = value;
    switch (this.typeActive) {
      case this.optionDownload.RENTAL:
        this.copys = this.translate.instant(
          'DOCUMENTS.TRIBUTARY.DETAIL.COPY_INCOME_TAX_TC',
        );
        break;
      default:
        this.copys = this.translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.COPY');
        break;
    }
    if (OptionsDownload.RENTAL === this.typeActive) {
      this.formTributary.controls.year.setValue(this.yearDefault);
    }
    this.formTributary.controls.optionCertificate.setValue(this.typeActive);
  }
  public _initForm(): void {
    this.options$
      .pipe(
        delay(1000),
        map((items) => items.filter((item) => item['STATUS'] === 'TRUE')),
      )
      .subscribe((data: IOptionAssets[]) => {
        this.options = data;
        this.typeActive =
          data['TEXT'] === this.typeActive ? data['TEXT'] : this.typeActive;
      });
    this.formTributary = new FormGroup({
      year: new FormControl('', [Validators.required]),
      optionCertificate: new FormControl(this.typeActive, [
        Validators.required,
      ]),
    });
  }

  public download(): void {
    this.loading = true;
    if (OptionsDownload.INCOME_TAX === this.typeActive) {
      this.model.creationIncomeSucces(this.formTributary.value.year);
      this.subscribe = this.model.stateTributaryIncome$.subscribe(
        (data: IincomeTax) => {
          if (
            this.service.downloadPDF(
              data.base64,
              data.success,
              data.errorMessage,
              `${this.formTributary.value.optionCertificate}${this.formTributary.value.year}`,
            )
          ) {
            this.typeActive = null;
            this._facade.notificationOpen(
              this._translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.SUCCESS'),
              true,
              ClassNotification.SUCCESS,
            );
            this.loading = false;
            this._initForm();
            this.subscribe.unsubscribe();
          } else if (data.errorMessage) {
            this.subscribe.unsubscribe();
            this.loading = false;
          }
        },
      );
    } else if (OptionsDownload.GMF === this.typeActive) {
      this.model.creationSucces(this.formTributary.value.year);
      this.subscribe = this.model.stateTributary$.subscribe(
        (data: ITributary) => {
          if (
            this.service.downloadPDF(
              data.base64,
              data.success,
              data.errorMessage,
              `${this.formTributary.value.optionCertificate}${this.formTributary.value.year}`,
            )
          ) {
            this.typeActive = null;
            this._facade.notificationOpen(
              this._translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.SUCCESS'),
              true,
              ClassNotification.SUCCESS,
            );
            this.loading = false;
            this._initForm();
            this.subscribe.unsubscribe();
          } else if (data.errorMessage) {
            this.subscribe.unsubscribe();
            this.loading = false;
          }
        },
      );
    } else if (OptionsDownload.RENTAL === this.typeActive) {
      this.model.creationIncomeTaxTCSucces(this.formTributary.value.year);
      this.subscribe = this.model.stateTributaryIncomeTaxTC$.subscribe(
        (data: IincomeTaxTC) => {
          data.documentResponse.forEach((e, i) => {
            setTimeout(() => {
              if (
                this.service.downloadPDF(
                  `${e['trnImage'][0]['binData']}`,
                  data.success,
                  data.errorMessage,
                  `${this.formTributary.value.optionCertificate}`,
                )
              ) {
                this._facade.notificationOpen(
                  this._translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.SUCCESS'),
                  true,
                  ClassNotification.SUCCESS,
                );
                this.loading = false;
                this.typeActive =
                  data.documentResponse.length === i + 1
                    ? null
                    : this.typeActive;
              }
              this._initForm();
              this.subscribe.unsubscribe();
            }, 1500);
          });
          if (data.errorMessage) {
            this.subscribe.unsubscribe();
            this.loading = false;
          }
        },
      );
    } else if (OptionsDownload.RAC === this.typeActive) {
      this.model.creationIncomeRacSucces(this.formTributary.value.year);
      this.subscribe = this.model.stateTributaryIncomeRac$.subscribe(
        (data: IincomeRac) => {
          if (
            this.service.downloadPDF(
              data.base64,
              data.base64 !== null,
              data.errorMessage,
              `${this.formTributary.value.optionCertificate}${this.formTributary.value.year}`,
            )
          ) {
            this.typeActive = null;
            this._facade.notificationOpen(
              this._translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.SUCCESS'),
              true,
              ClassNotification.SUCCESS,
            );
            this.loading = false;
            this._initForm();
            this.subscribe.unsubscribe();
          } else if (data.base64 === null && data.dateTime) {
            this.subscribe.unsubscribe();
            this.copys = this.translate.instant(
              'DOCUMENTS.TRIBUTARY.DETAIL.COPY_RAC',
            );
            this.loading = false;
          }
        },
      );
    }
  }
  get productsTC$(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return (
            product.accountInformation.productType === TYPE_ACCOUNTS.CREDIT_CARD
          );
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this._initForm();
    this.subscribe.unsubscribe();
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }

  get optionDocuments$(): Observable<CertificateTaxes> {
    return this.optionsModule$.pipe(
      map((data: OptionModuleState) => {
        return data.data.certificate_taxes.options;
      }),
    );
  }

  public showOption(options: any, title: string): boolean {
    if (!options) {
      return;
    }
    const obj = {
      [NavigateOptionEnum.TAX_RET_SOURCE]: ObjectOptionEnum.TAX_RET_SOURCE,
      [NavigateOptionEnum.TAX_GMF]: ObjectOptionEnum.TAX_GMF,
      [NavigateOptionEnum.TAX_RAC]: ObjectOptionEnum.TAX_RAC,
      [NavigateOptionEnum.TAX_TC]: ObjectOptionEnum.TAX_TC,
    };
    const option = obj[title];
    const state = options[option];
    return state;
  }
}
