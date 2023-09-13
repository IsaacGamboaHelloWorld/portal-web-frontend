import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { DialogRef } from '@app/shared/modal/services/dialog-ref';
import { InsertionDirective } from './directive/insertion.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective;

  private readonly _onClose: any = new Subject<any>();
  public onClose: Observable<any> = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    public config: DialogConfig,
  ) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (!!this.componentRef) {
      this.componentRef.destroy();
    }
  }

  public onOverlayClicked(): void {
    if (this.config.closeOutSide) {
      this.dialogRef.close();
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public loadChildComponent(componentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType,
    );
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
