import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { Subject } from 'rxjs';

import { TestingModule } from '../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../core/services/manipulate-dom/manipulate-dom.service';
import { SMALL_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';
import { TemplateSystemContainer } from './template-system.container';

describe('TemplateSystemContainer', () => {
  let component: TemplateSystemContainer;
  let fixture: ComponentFixture<TemplateSystemContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [TemplateSystemContainer],
      providers: [ManipulateDomService, ModalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSystemContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('back for navigatorActive is true and navInternal is false', () => {
    const url = '/';
    component.navigatorActive = true;
    component.navInternal = false;
    component.backUrl = url;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.back();

    expect(spy).toHaveBeenCalledWith([url]);
  });

  it('back for navigatorActive is false and navInternal is false', () => {
    component.navigatorActive = false;
    component.navInternal = false;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.back();

    expect(spy).not.toHaveBeenCalled();
  });

  it('back for navigatorActive and navInternal are true and this.currentStep === 1 || this.maxStep === 1 true', () => {
    const url = '/';
    component.navigatorActive = true;
    component.navInternal = true;
    component.currentStep = 1;
    component.backUrl = url;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.back();

    expect(spy).toHaveBeenCalledWith([url]);
  });

  it('back for navigatorActive and navInternal are true and this.currentStep === 1 || this.maxStep === 1 false and biller is true', () => {
    const url = '/';
    component.navigatorActive = true;
    component.navInternal = true;
    component.currentStep = 2;
    component.backUrl = url;
    component.biller = true;

    component.back();

    expect(component.currentStep).toEqual(1);
  });

  it('back for navigatorActive and navInternal are true and this.currentStep === 1 || this.maxStep === 1 false and biller is false', () => {
    const url = '/';
    component.navigatorActive = true;
    component.navInternal = true;
    component.currentStep = 2;
    component.backUrl = url;
    component.biller = false;

    component.back();

    expect(component.currentStep).toEqual(1);
  });

  it('openAlert', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    const spyAction = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();

    component.openAlert();

    expect(spyModal).toHaveBeenCalledWith(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);

    expect(spyAction).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal with _dialogComponentRef', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              title: 'POCKETS.CANCEL_TEXT',
              img: '/cancelar_bolsillo.png',
              btnCancel: 'POCKETS.NEW.MODAL.NO',
              btnAgree: 'POCKETS.NEW.MODAL.YES',
              actionCancel: new Subject(),
              actionAgree: new Subject(),
            },
          },
        },
      },
    };

    (component as any)._modal = mockModal;

    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();

    mockModal._dialogComponentRef.instance.componentRef.instance.actionCancel
      .pipe()
      .subscribe((_data: any) => {
        expect(spyClose).toHaveBeenCalled();
      });
  });

  it('_actionsModal without _dialogComponentRef', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();
    expect(spyClose).not.toHaveBeenCalled();
  });

  it('_actionsButtons for true', () => {
    const url = '/';
    component.backUrl = url;
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const router = TestBed.get(Router);
    const spyNavigate = spyOn(router, 'navigate');

    (component as any)._actionsButtons(true);

    expect(spyNavigate).toHaveBeenCalledWith([url]);
    expect(spyClose).toHaveBeenCalled();
  });

  it('_actionsButtons for false', () => {
    const url = '/';
    component.backUrl = url;
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'close');

    (component as any)._actionsButtons(false);

    expect(spy).toHaveBeenCalled();
  });
});
