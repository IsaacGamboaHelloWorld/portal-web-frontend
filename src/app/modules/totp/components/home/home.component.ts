import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INavigateTotp, NavigateTotp } from '../../constants/routes';
import { TotpModel } from '../../store/models/totp.model';
import {
  ITotpDelete,
  ITotpDevices,
  ITotpGenerate,
} from '../../store/state/totp.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public step: number = 1;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: TotpModel,
    private dom: ManipulateDomService,
    private router: Router,
    private _modalService: ModalService,
    private translate: TranslateService,
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.dom.scrollTop();
    this.dom.scrollContentTop();
    this.model.totpGenerateLoad();
    this.model.totpDevicesLoad();
    this._loadTotp();
  }

  public register(): void {
    this.router.navigate([this.internalNavigate.register]);
  }

  public openModal(deviceName: string, id: string): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(deviceName, id), 10);
  }

  public _actionsModal(deviceName: string, id: string): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this.translate.instant(
        `TOTP_AUTHENTICATION.MODAL_WARNING_DELETE_DEVICE.TITLE`,
      );
      component.subtitle = this.translate.instant(deviceName);
      component.description = null;

      component.btnAgree = this.translate.instant(
        `TOTP_AUTHENTICATION.MODAL_WARNING_DELETE_DEVICE.BTN_OK`,
      );
      component.btnCancel = this.translate.instant(
        `TOTP_AUTHENTICATION.MODAL_WARNING_DELETE_DEVICE.BTN_CANCEL`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this._modalService.close();
        this._deleteDeviceTotp(id);
        subs.unsubscribe();
      });
      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._modalService.close();
      });
    }
  }
  private _deleteDeviceTotp(id: string): void {
    this.model.totpDeleteLoad(id);
  }

  private _loadTotp(): void {
    this.deleteTotp$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: ITotpDelete) => {
        if (!!data && !!data.data && data.data.success) {
          this.model.totpDevicesLoad();
        }
      });
  }

  get deleteTotp$(): Observable<ITotpDelete> {
    return this.model.deleteTotp$;
  }

  get generateTotp$(): Observable<ITotpGenerate> {
    return this.model.generateTotp$;
  }

  get devicesTotp$(): Observable<ITotpDevices> {
    return this.model.devicesTotp$;
  }

  get internalNavigate(): INavigateTotp {
    return NavigateTotp;
  }
}
