import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SecurityModel } from '../../../../store/model/security.model';
import { ITypeChannel, TypeChannel } from '../../constants/type-channel.enum';
import {
  ICudChannel,
  IDataChannel,
  IGenericChannel,
} from '../../store/state/access-control.state';

@Component({
  selector: 'app-access-control-home',
  templateUrl: './access-control-home.component.html',
  styleUrls: ['./access-control-home.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessControlHomeComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean>;
  private channelData: IDataChannel;

  private statusCodeSuccess: string = '200';

  constructor(
    private dom: ManipulateDomService,
    public model: SecurityModel,
    private translateService: TranslateService,
    private modalService: ModalService,
  ) {
    this._destroy$ = new Subject<boolean>();
    this._subsStatusChannel();
  }

  ngOnInit(): void {
    this.model.getAccessControlLoad();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _subsStatusChannel(): void {
    this.cudAccessControl$
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp: IGenericChannel<ICudChannel>) => {
        if (
          !!resp &&
          !!resp.data &&
          !!resp.data.statusCode &&
          resp.data.statusCode === this.statusCodeSuccess
        ) {
          this.model.getAccessControlLoad();
        }
      });
  }

  changeStatus(state: boolean, type: string): void {
    if (state) {
      this._openModal(type);
    } else {
      // TODO: para desbloquear MB falta la integración con métodos de verificación de Raúl
      this._fetchCudChannelLock(state, type);
    }
  }

  private _fetchCudChannelLock(state: boolean, type: string): void {
    if (!!this.channelData) {
      const data = {
        PB: this.channelData.PB,
        MB: this.channelData.MB,
        [type]: state,
      };
      this.model.cudAccessControlCreate(data.PB, data.MB);
    }
  }

  private _openModal(type: string): void {
    this.modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(type), 10);
  }

  public _actionsModal(type: string): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      this._setupDomModal();
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this.translateService.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.TITLE`,
      );
      component.subtitle = this.translateService.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.MAIN_DESCRIPTION_${type}`,
      );
      component.description = this.translateService.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.SECONDARY_DESCRIPTION`,
      );
      component.btnAgree = this.translateService.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.OK_BUTTON`,
      );
      component.btnCancel = this.translateService.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.CANCEL_BUTTON`,
      );

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._fetchCudChannelLock(true, type);
        this.modalService.close();
      });

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.model.getAccessControlLoad();
        this.modalService.close();
      });
    }
  }

  private _setupDomModal(): void {
    this.dom.addClass('.ds-modal-container', 'ac-home-container');
  }

  get lastSession$(): Observable<string> {
    return this.model.hourSession$;
  }

  get statusChannel$(): Observable<IGenericChannel<IDataChannel>> {
    return this.model.getAccessControl$.pipe(
      tap((resp: IGenericChannel<IDataChannel>) => {
        this.channelData = !!resp && !!resp.data ? resp.data : null;
      }),
    );
  }

  get cudAccessControl$(): Observable<any> {
    return this.model.cudAccessControl$;
  }

  get getTypeChannel(): ITypeChannel {
    return TypeChannel;
  }
}
