import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { isIOS } from '@app/shared/helpers/isMobile';
import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import {
  DialogConfig,
  IDialogConfig,
} from '@app/shared/modal/services/dialog-config';
import { DialogInjector } from '@app/shared/modal/services/dialog-injector';
import { DialogRef } from '@app/shared/modal/services/dialog-ref';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ModalComponent } from '../modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public _dialogComponentRef: ComponentRef<ModalComponent>;
  public dataConfig: IDialogConfig;
  public disableClose: boolean;

  private wrapModal: string = '.wrap-modal';
  private hideClass: string = 'not-button-close';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private dom: ManipulateDomService,
  ) {}

  public open(
    componentType: Type<any>,
    closeOutSide: boolean = true,
    typeClass: string = DEFAULT_WIDTH,
    animation: boolean = true,
    data: any = {},
    paddingContainer: boolean = false,
    align: string = '',
  ): DialogRef {
    this.disableClose = false;
    this.dataConfig = {
      data,
      typeClass,
      closeOutSide,
      nameComponent: componentType.name,
      animation,
      paddingContainer,
      align,
    };
    const dialogRef = this._appendDialogComponentToBody(this.dataConfig);

    this._dialogComponentRef.instance.childComponentType = componentType;
    if (!isIOS()) {
      disableBodyScroll(document.querySelector('.container'));
    }
    return dialogRef;
  }

  public edit(property: string, value: any): void {
    this.dataConfig.data[property] = value;
  }

  public close(immediate: boolean = false): void {
    if (!this.disableClose) {
      this._removeDialogComponentFromBody(immediate);
    }
  }

  public hideBtnCancel(hide: boolean): void {
    if (hide) {
      this.dom.addClass(this.wrapModal, this.hideClass);
    } else {
      this.dom.removeClass(this.wrapModal, this.hideClass);
    }
  }

  private _appendDialogComponentToBody(config: DialogConfig): DialogRef {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this._removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent,
    );
    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, map),
    );

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this._dialogComponentRef = componentRef;

    this._dialogComponentRef.instance.onClose.subscribe(() => {
      this._removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private _removeDialogComponentFromBody(immediate: boolean = false): void {
    if (!!this._dialogComponentRef) {
      if (!immediate && this.dom.containsClass('.wrap-modal', 'animation')) {
        this.dom.addClass('.wrap-modal', 'close');
        setTimeout((_) => {
          this._removeDialog();
        }, 500);
      } else {
        this._removeDialog();
      }
    }
  }

  private _removeDialog(): void {
    this.appRef.detachView(this._dialogComponentRef.hostView);
    this._dialogComponentRef.destroy();
    if (!isIOS()) {
      enableBodyScroll(document.querySelector('.container'));
    }
  }
}
