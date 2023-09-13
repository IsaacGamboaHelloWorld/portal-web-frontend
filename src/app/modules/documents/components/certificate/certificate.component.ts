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
import { INavigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { Navigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICertificate } from '../../entities/documents';
import { INavigateDocuments, NavigateDocuments } from '../../entities/routes';
import { DocumentsService } from '../../services/documents.service';
import { CertificateModel } from '../../store/model/certificate.model';
import { HomeModelDocuments } from '../../store/model/home.model';
import { IOptionsSelect, OptionsSelect } from './certificate.utils';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [DocumentsService],
})
export class CertificateComponent implements OnInit, OnDestroy {
  public formCertificate: FormGroup;
  public loading: boolean = false;
  public typeActive: any;
  public select: object[] = [];
  public iconColorLeft: boolean = false;
  public iconColorRight: boolean = false;
  public again: boolean = false;
  public loadingItems: number = 1;
  public subscribe: Subscription = new Subscription();
  @ViewChild('scroll', null) public scroll: ElementRef;
  constructor(
    private model: CertificateModel,
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

  get options(): IOptionsSelect {
    return OptionsSelect;
  }
  get products(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
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
    this.select = [
      { label: this.options.WITHOUT, value: false },
      { label: this.options.WITH, value: true },
    ];
    this._initForm();
  }

  public _initForm(): void {
    this.formCertificate = new FormGroup({
      optionCertificate: new FormControl('', [Validators.required]),
      withPay: new FormControl({ value: false, disabled: true }, [
        Validators.required,
      ]),
      nameOptional: new FormControl({ value: '', disabled: true }),
    });
  }
  public download(): void {
    this.loading = true;
    const obj = {};
    obj['accountId'] = this.typeActive['accountIdentifier'];
    obj['accountType'] = this.typeActive['productType'];
    obj['includeBalance'] = this.formCertificate.value.withPay;
    obj['recipient'] = this.formCertificate.value.nameOptional;
    this.model.creationSucces(obj);
    this.subscribe = this.model.stateCertificate$.subscribe(
      (data: ICertificate) => {
        if (
          this.service.downloadPDF(
            data.base64,
            data.success,
            data.errorMessage,
            `${this._translate.instant(
              `PRODUCT_TYPES.${this.typeActive['productType']}`,
            )}${String(this.typeActive['accountIdentifier']).slice(-4)}`,
          )
        ) {
          this.typeActive = null;
          this.formCertificate.controls.withPay.disable();
          this._facade.notificationOpen(
            this._translate.instant('DOCUMENTS.CERTIFICATE.DETAIL.SUCCESS'),
            true,
            ClassNotification.SUCCESS,
          );
          this.loading = false;
          this.again = false;
          this._initForm();
          this.subscribe.unsubscribe();
        }
        if (data.errorMessage) {
          this.again = true;
          this.loading = false;
        }
      },
    );
  }

  public setBorder(value: object): void {
    this.typeActive = value;
    this.formCertificate.controls.optionCertificate.setValue(this.typeActive);
    this.formCertificate.controls.withPay.enable();
    this.formCertificate.controls.nameOptional.enable();
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
}
