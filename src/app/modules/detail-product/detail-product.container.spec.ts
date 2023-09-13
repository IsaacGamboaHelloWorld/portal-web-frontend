import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogRef } from '@app/shared/modal/services/dialog-ref';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductModel } from '@modules/detail-product/detail-product.model';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { DetailProductModelMock } from '../../../../test-helpers/mocks/models/detail-product.model.mock';
import { HomeModelMock } from '../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { DialogConfig } from '../../shared/modal/services/dialog-config';
import { ModalService } from '../../shared/modal/services/modal.service';
import { HomeModel } from '../home/home.model';
import { StatementsService } from './components/statements/services/statements.service';
import { DetailProductContainer } from './detail-product.container';

import { of } from 'rxjs';

import { BANKS } from '@app/core/constants/banks';
import { DATE_FILTER } from './constants/filter';

import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { DetailProductPfmMock } from '@root/test-helpers/mocks/models/detail-product-pfm.mock';
import { FreeDestinationDetailMock } from '../../../../test-helpers/mocks/data/freeDestinations.mock';
import { DetailProductPFMModel } from '../detail-product-pfm/detail-product-pfm.model';

describe('DetailProductContainer', () => {
  let component: DetailProductContainer;
  let fixture: ComponentFixture<DetailProductContainer>;
  let modelTest: DetailProductModel;
  let domTest: ManipulateDomService;
  let modelMock: DetailProductModelMock;

  beforeEach(async(() => {
    modelMock = new DetailProductModelMock();

    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [DetailProductContainer, RemoveValuePipe],
      providers: [
        SecurityService,
        Security,
        ManipulateDomService,
        ModalService,
        {
          provide: DetailProductModel,
          useValue: modelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
        {
          provide: DetailProductPFMModel,
          useClass: DetailProductPfmMock,
        },
        StatementsService,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductContainer);
    modelTest = TestBed.get(DetailProductModel);
    domTest = TestBed.get(ManipulateDomService);
    component = fixture.componentInstance;
    spyOnProperty(component, 'hasMovements$', 'get').and.returnValue(false);
    spyOnProperty(component, 'hasInfoProduct$', 'get').and.returnValue(false);
    spyOnProperty(component, 'hasFilter$', 'get').and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('execute ngOnInit and scrollTop to be called', () => {
    const spy = spyOn(domTest, 'scrollTop');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('fetchPockets to be called', () => {
    const spyFetchPockets = spyOn(modelTest, 'fetchPockets');
    component.fetchPockets();
    expect(spyFetchPockets).toHaveBeenCalled();
  });

  it('removeFilter :: resetMovements and resetFilter to be called', () => {
    const spyResetMovements = spyOn(modelTest, 'resetMovements');
    const spyResetFilter = spyOn(modelTest, 'resetFilter');
    const spyFetchMovement = spyOn(component, 'fetchMovement');
    component.removeFilter();
    expect(spyResetMovements).toHaveBeenCalled();
    expect(spyResetFilter).toHaveBeenCalled();
    expect(spyFetchMovement).toHaveBeenCalled();
  });

  it('onChange with textFilter empty expect emptyState equal true', () => {
    component.textFilter = '';
    const event = {};
    component.onChange(event);
    expect(component.emptyState).toBeTruthy();
  });

  it('onChange with textFilter is not empty expect called', () => {
    component.textFilter = 'search';
    const event = {};
    component.onChange(event);
    expect(component.emptyState).toBeTruthy();
  });

  it('openSearchBox called with filterState true', () => {
    component.filterState = true;
    component.openSearchBox();
    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
  });

  it('openSearchBox called with filterState false', () => {
    component.filterState = false;
    component.openSearchBox();
    expect(component.textFilter).toEqual('');
  });

  it('onKeyUp called with textFilter empty', () => {
    component.textFilter = '';
    const event = {};
    component.onKeyUp(event);
    expect(component.emptyState).toBeTruthy();
  });

  it('onKeyUp called with textFilter is not empty', () => {
    component.textFilter = 'searching';
    const event = {};
    component.onKeyUp(event);
    expect(component.emptyState).toBeFalsy();
  });

  it('doClear is called', () => {
    const event = { preventDefault: () => {} };
    component.doClear(event);
    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
  });

  it('filterInfo$ is called', () => {
    const result$ = component.filterInfo$;
    expect(modelTest.movementFilter$).toEqual(result$);
  });

  it('payrollLoans$ is called', () => {
    const testModelPayrollLoans = TestBed.get(HomeModel);
    const result$ = component.payrollLoans$;
    expect(testModelPayrollLoans.orderOfPayment$).toEqual(result$);
  });

  it('pockets$ is called', () => {
    const result$ = component.pockets$;
    expect(modelTest.pockets$).toEqual(result$);
  });

  it('movements$ is called', () => {
    const result$ = component.movements$;
    expect(modelTest.movement$).toEqual(result$);
  });

  it('isSafari is called', () => {
    const result = component.isSafari;
    expect(result).toBeFalsy();
  });

  it('openFilter is called', () => {
    const modalTest = TestBed.get(ModalService);
    const spy = spyOn(modalTest, 'open').and.callFake(() => {});
    component.openFilter();
    expect(spy).toHaveBeenCalled();
  });

  it('hasFilter$ is called', () => {
    const data = {
      typeFilter: DATE_FILTER,
    };
    spyOn(modelTest, 'movementFilter$').and.returnValue(of(data));
    const result = component.hasFilter$;
    expect(result).toBeFalsy();
  });

  it('isDate$ is called with data', () => {
    const data = {
      typeFilter: DATE_FILTER,
    };
    spyOn(component, 'filterInfo$').and.returnValue(of(data));
    const result = component.isDate$;
    expect(result).toBeTruthy();
  });

  it('isDate$ is called without typeFilter', () => {
    const data = {};
    spyOn(component, 'filterInfo$').and.returnValue(of(data));
    const result = component.isDate$;
    expect(result).toBeTruthy();
  });

  it('redirect is called account type credit_card', () => {
    component.account.type = 'credit_card';
    component.account.id = '1';
    const url = '/home';
    const dataToSave: IProductActive = {
      type: component.account.type,
      id: component.account.id,
      name: 'Tarjeta de crédito',
      bank: '0002',
      bank_name: BANKS.BANCO_POPULAR,
    };

    const spy = spyOn(modelTest, 'setProduct');
    component.redirect(url);

    expect(spy).toHaveBeenCalledWith(dataToSave);
  });

  it('redirect is called account type deposit_account', () => {
    component.account.type = 'deposit_account';
    component.account.id = '2';
    const url = '/home';
    const spy = spyOn(modelTest, 'setProduct');

    component.redirect(url);

    expect(spy).toHaveBeenCalledWith(component.account);
  });

  it('_setFreeDestination', () => {
    component.isFreeDestination = false;
    (component as any)._setFreeDestination();
    expect(component.isFreeDestination).toBeTruthy();
  });

  it('hasFreeDestinationDetail$', () => {
    const result = component.hasFreeDestinationDetail$;
    expect(result).toBeTruthy();
  });

  it('freeDestinations$', () => {
    component.account = {
      id: '112200305',
      type: '',
    };
    component.freeDestinations$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(
        JSON.stringify(FreeDestinationDetailMock.freeDestinationCredit),
      );
    });
  });

  it('fetchDetail', () => {
    component.account = {
      id: '112200305',
      type: '',
    };
    const spy = spyOn(modelTest, 'fetchDetailProduct');
    component.fetchDetail();
    expect(spy).toHaveBeenCalledWith('', '112200305');
  });
});
