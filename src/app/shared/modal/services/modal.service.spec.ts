import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalComponent } from '@app/shared/modal/modal.component';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { IDialogConfig } from './dialog-config';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        ModalService,
        {
          provide: ManipulateDomService,
          useValue: {
            containsClass: () => true,
            addClass: () => {},
            removeClass: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [ModalComponent] },
    });

    service = TestBed.get(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should option modal', () => {
    expect(service._dialogComponentRef).toBeUndefined();
    service.open(ModalComponent, true, DEFAULT_WIDTH, true, {});
    expect(service._dialogComponentRef).toBeDefined();
    service.close();
  });

  it('should be option remove', inject(
    [ManipulateDomService],
    (dom: ManipulateDomService) => {
      dom.containsClass = () => false;
      service.open(ModalComponent);
      expect(service._dialogComponentRef).toBeDefined();
      service.close();
    },
  ));

  it('call edit and change value background property', () => {
    const dataConfig: IDialogConfig = {
      data: {
        background: '#ffffff',
      },
      typeClass: '',
      closeOutSide: false,
      nameComponent: '',
      animation: true,
      paddingContainer: true,
      align: '',
    };
    service.dataConfig = dataConfig;
    service.edit('background', '#000000');
    expect(service.dataConfig.data['background']).toBe('#000000');
  });

  it('addClass should be called when execute hideBtnCancel with true', () => {
    const testBet = TestBed.get(ManipulateDomService);
    const spy = spyOn(testBet, 'addClass');
    service.hideBtnCancel(true);
    expect(spy).toHaveBeenCalledWith(
      (service as any).wrapModal,
      (service as any).hideClass,
    );
  });

  it('removeClass should be called when execute hideBtnCancel with false', () => {
    const testBet = TestBed.get(ManipulateDomService);
    const spy = spyOn(testBet, 'removeClass');
    service.hideBtnCancel(false);
    expect(spy).toHaveBeenCalledWith(
      (service as any).wrapModal,
      (service as any).hideClass,
    );
  });
});
