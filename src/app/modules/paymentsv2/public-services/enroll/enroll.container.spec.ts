import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';

import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { EnrollPublicServiceContainer } from './enroll.container';
import { EnrollFacade } from './enroll.facade';
import { EnrollService } from './services/enroll-service.service';

describe('EnrollPublicServiceContainer', () => {
  let component: EnrollPublicServiceContainer;
  let fixture: ComponentFixture<EnrollPublicServiceContainer>;
  let facade: EnrollFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [EnrollPublicServiceContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: EnrollFacade,
          useClass: PaymentsV2ModelMock,
        },
        EnrollService,
        ManipulateDomService,
        ModalService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollPublicServiceContainer);
    component = fixture.componentInstance;
    facade = TestBed.get(EnrollFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_savedSuccess', () => {
    const spyNotification = spyOn(facade, 'notificationOpen');

    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    (component as any)._savedSuccess();

    expect(spyNotification).toHaveBeenCalledWith(
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.ENROLL.ENROLL_SUCCESS',
      true,
      ClassNotification.SUCCESS,
    );
    expect(spyRouter).toHaveBeenCalledWith([Navigate.paymentsv2services]);
  });

  it('_savedError', () => {
    const message = 'error';
    const spyNotification = spyOn(facade, 'notificationOpen');

    (component as any)._savedError(message);

    expect(spyNotification).toHaveBeenCalledWith(
      message,
      true,
      ClassNotification.ERROR,
    );
  });

  it('doClear', () => {
    const event = {
      preventDefault: () => {},
    };

    component.textFilter = 'lala';
    component.emptyState = false;
    component.stepOne = false;

    const spy = spyOn(facade, 'clearServiceSaved');
    spyOn(document, 'querySelector').and.returnValue({
      classList: {
        remove: () => {},
      },
    });

    component.doClear(event);

    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
    expect(component.stepOne).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('onChange for IF', () => {
    const event = {};
    component.emptyState = false;
    component.textFilter = '';

    component.onChange(event);

    expect(component.emptyState).toBeTruthy();
  });

  it('onChange for ELSE', () => {
    const event = {};
    component.emptyState = false;
    component.textFilter = 'lala';

    component.onChange(event);

    expect(component.emptyState).toBeFalsy();
  });

  it('onKeyUp for IF', () => {
    const event = {};
    spyOn(document, 'querySelector').and.returnValue({
      classList: {
        remove: () => {},
        add: () => {},
      },
    });
    const spy = spyOn(facade, 'searchData');
    component.textFilter = 'lala';

    component.onKeyUp(event);

    expect(spy).toHaveBeenCalled();
  });

  it('onKeyUp for ELSE', () => {
    const event = {};
    spyOn(document, 'querySelector').and.returnValue({
      classList: {
        remove: () => {},
        add: () => {},
      },
    });
    const spy = spyOn(facade, 'searchData');
    component.textFilter = '';

    component.onKeyUp(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('submitForm', () => {
    component.formEnroll = new FormGroup({
      entity: new FormControl('', Validators.required),
    });
    component.stepTwo = true;
    component.textFilter = 'lala';

    const spy = spyOn(facade, 'fetchCompanyActive');
    spyOn(document, 'querySelector').and.returnValue({
      classList: {
        remove: () => {},
        add: () => {},
      },
    });

    component.submitForm();

    expect(spy).toHaveBeenCalled();
    expect(component.stepOne).toBeFalsy();
    expect(component.textFilter).toEqual('');
  });

  it('doRegister', () => {
    component.formAddService = new FormGroup({
      name_serv: new FormControl('', [Validators.required]),
      no_serv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    component.tempCompany = {
      organizationId: '002',
    } as any;

    const spy = spyOn(facade, 'fetchNewService');

    component.doRegister();

    expect(spy).toHaveBeenCalled();
  });

  it('setClass', () => {
    const _id = '1';
    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass(_id);

    expect(spyRemove).toHaveBeenCalledWith(
      '.form-radiobutton-container',
      'active',
    );
    expect(spyAdd).toHaveBeenCalledWith('.type-company-' + _id, 'active');
  });

  it('companies$', () => {
    const result = component.companies$;
    expect(result).toEqual(facade.companyList$);
  });

  it('companyActive$', () => {
    const result = component.companyActive$;
    expect(result).toEqual(facade.companyActive$);
  });

  it('savedAggrement$', () => {
    const result = component.savedAggrement$;
    expect(result).toEqual(facade.serviceAdded$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });
});
