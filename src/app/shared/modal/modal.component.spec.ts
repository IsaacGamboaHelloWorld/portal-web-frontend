import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { InsertionDirective } from '@app/shared/modal/directive/insertion.directive';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { DialogRef } from '@app/shared/modal/services/dialog-ref';
import { ModalComponent } from './modal.component';

@Component({
  template: '',
})
class DummyComponent {
  constructor() {}
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, DummyComponent, InsertionDirective],
      providers: [
        DialogRef,
        {
          provide: DialogConfig,
          useValue: {
            data: null,
            typeClass: '',
            closeOutSide: true,
            nameComponent: 'Test',
            animation: 'true',
          },
        },
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DummyComponent],
      },
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should close modal', () => {
    component.onOverlayClicked();
  });

  it('should set pageLoaded after view init', () => {
    component.childComponentType = DummyComponent;
    fixture.detectChanges();
  });

  it('close', () => {
    const dialogRef = TestBed.get(DialogRef);
    const spy = spyOn(dialogRef, 'close');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
