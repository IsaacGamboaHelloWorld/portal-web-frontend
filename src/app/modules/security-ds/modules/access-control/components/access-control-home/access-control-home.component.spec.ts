import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityModel } from '@app/modules/security-ds/store/model/security.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { BlockChannelCreateSuccess } from '../../../../../../../../test-helpers/mocks/data/security.access-control.mock';
import { SecurityModelMock } from '../../../../../../../../test-helpers/mocks/models/security.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { Subject } from 'rxjs';
import { AccessControlHomeComponent } from './access-control-home.component';

describe('AccessControlHomeComponent', () => {
  let component: AccessControlHomeComponent;
  let fixture: ComponentFixture<AccessControlHomeComponent>;
  let model: SecurityModel;
  let modelMock: SecurityModelMock;

  beforeEach(async(() => {
    modelMock = new SecurityModelMock();
    TestBed.configureTestingModule({
      declarations: [AccessControlHomeComponent],
      imports: [TestingModule],
      providers: [
        {
          provide: SecurityModel,
          useValue: modelMock,
        },
        ManipulateDomService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessControlHomeComponent);
    component = fixture.componentInstance;
    model = TestBed.get(SecurityModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_subsStatusChannel for success', () => {
    modelMock.setInnerCudAccessControl = {
      data: {
        ...BlockChannelCreateSuccess,
        statusCode: '200',
      },
    };
    const spy = spyOn(model, 'getAccessControlLoad');

    (component as any)._subsStatusChannel();

    const sub = component.cudAccessControl$.subscribe((_data: any) => {
      expect(spy).toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  it('_subsStatusChannel for error', () => {
    modelMock.setInnerCudAccessControl = {
      data: {
        ...BlockChannelCreateSuccess,
        statusCode: '401',
      },
    };
    const spy = spyOn(model, 'getAccessControlLoad');

    (component as any)._subsStatusChannel();

    const sub = component.cudAccessControl$.subscribe((_data: any) => {
      expect(spy).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  it('changeStatus when state is true', () => {
    const type = 'PB';
    const spy = spyOn(component as any, '_openModal');
    component.changeStatus(true, type);
    expect(spy).toHaveBeenCalled();
  });

  it('changeStatus when state is false', () => {
    const type = 'PB';
    const spy = spyOn(component as any, '_fetchCudChannelLock');
    component.changeStatus(false, type);
    expect(spy).toHaveBeenCalledWith(false, type);
  });

  it('_fetchCudChannelLock with data when state is true, type PB', () => {
    (component as any).channelData = {
      PB: true,
      MB: true,
    };
    const spy = spyOn(model, 'cudAccessControlCreate');

    (component as any)._fetchCudChannelLock(false, 'PB');

    expect(spy).toHaveBeenCalledWith(false, true);
  });

  it('_fetchCudChannelLock without data', () => {
    (component as any).channelData = null;
    const spy = spyOn(model, 'cudAccessControlCreate');

    (component as any)._fetchCudChannelLock(false, 'PB');

    expect(spy).not.toHaveBeenCalled();
  });

  it('_openModal', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    const spyActions = spyOn(component as any, '_actionsModal');

    jasmine.clock().install();

    (component as any)._openModal('PB');

    expect(spyModal).toHaveBeenCalledWith(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);
    expect(spyActions).toHaveBeenCalledWith('PB');
    jasmine.clock().uninstall();
  });

  it('_actionsModal actionAgree', () => {
    const modal = TestBed.get(ModalService);
    const data = {
      instance: {
        componentRef: {
          instance: {
            img: '/essential-warning-6@3x.png',
            typeModal: 'warning',
            title: `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.TITLE`,
            subtitle: `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.MAIN_DESCRIPTION_PB`,
            description: `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.SECONDARY_DESCRIPTION`,
            btnAgree: `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.OK_BUTTON`,
            btnCancel: `SECURITY.ACCESS_CONTROL.MODAL_CONFIRM.CANCEL_BUTTON`,
            actionAgree: new Subject(),
            actionCancel: new Subject(),
          },
        },
      },
    };

    modal._dialogComponentRef = data;
    (component as any)._actionsModal('PB');
  });

  it('_setupDomModal', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'addClass');

    (component as any)._setupDomModal();

    expect(spy).toHaveBeenCalledWith(
      '.ds-modal-container',
      'ac-home-container',
    );
  });
});
