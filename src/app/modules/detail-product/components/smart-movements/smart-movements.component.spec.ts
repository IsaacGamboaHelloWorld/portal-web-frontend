import { MovementsState } from '@store/reducers/models/movements/movement.reducer';
import {
  MovementsStateMock,
  MovementsStateOnlyCreditCardMock,
} from './../../../../../../test-helpers/mocks/data/movements.mock';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Navigate } from '@app/core/constants/navigate';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../core/pipes/remove-value.pipe';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '../../../security/services/security.service';
import { Security } from '../../../security/utils/security';
import { DetailProductModel } from '../../detail-product.model';
import { SearchTextMovementPipe } from '../../pipes/search-text-movement/search-text-movement.pipe';
import { SmartMovementsComponent } from './smart-movements.component';

import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { movementsFileResponseMock } from '../../../../../../test-helpers/mocks/data/movementsFiles.mock';
import { FilterDateComponent } from '../filter-date/filter-date.component';

describe('SmartMovementsComponent', () => {
  let component: SmartMovementsComponent;
  let fixture: ComponentFixture<SmartMovementsComponent>;
  let model: DetailProductModel;
  let modelMock: DetailProductModelMock;

  beforeEach(async(() => {
    modelMock = new DetailProductModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [SmartMovementsComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: DetailProductModel,
          useValue: modelMock,
        },
        SearchTextMovementPipe,
        ModalService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMovementsComponent);
    model = TestBed.get(DetailProductModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('movementsFile$', () => {
    const result = component.movementsFile$;
    expect(result).toEqual(model.movementsFileResponse$);
  });

  it('movementsFileState$', () => {
    const result = component.movementsFileState$;
    expect(result).toEqual(model.movementsFileState$);
  });

  it('filterInfo$', () => {
    const result = component.filterInfo$;
    expect(result).toEqual(model.movementFilter$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('onKeyUp should be return true', () => {
    component.textFilter = '';
    component.onKeyUp({});
    expect(component.emptyState).toBeTruthy();
  });

  it('onKeyUp should be return false', () => {
    component.textFilter = 'lalala';
    component.onKeyUp({});
    expect(component.emptyState).toBeFalsy();
  });

  it('openFilter', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');
    component.openFilter();
    expect(spy).toHaveBeenCalledWith(
      FilterDateComponent,
      true,
      `${DEFAULT_WIDTH}`,
    );
  });

  it('openSearchBox with filterState is true', () => {
    component.filterState = true;
    component.textFilter = 'lalala';
    component.emptyState = false;
    component.openSearchBox();
    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
  });

  it('openSearchBox with filterState is false', () => {
    component.filterState = false;
    component.textFilter = 'lalala';
    component.emptyState = false;
    component.openSearchBox();
    expect(component.textFilter).toEqual('lalala');
    expect(component.emptyState).toBeFalsy();
  });

  it('doClear', () => {
    const event = {
      preventDefault(): void {},
    };

    component.textFilter = 'lalala';
    component.emptyState = false;

    component.doClear(event);

    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
  });

  it('onChange when textFilter is empty', () => {
    component.textFilter = '';
    component.emptyState = false;
    component.onChange({});
    expect(component.emptyState).toBeTruthy();
  });

  it('onChange when textFilter is not empty', () => {
    component.textFilter = 'lalala';
    component.emptyState = false;
    component.onChange({});
    expect(component.emptyState).toBeFalsy();
  });

  it('doDownloadFileFromStore', () => {
    modelMock.setInnerMovementFileResponseData = movementsFileResponseMock as any;
    component.doDownloadFileFromStore();
  });

  it('removeFilter', () => {
    const spyMovements = spyOn(model, 'resetMovements');
    const spyMovement = spyOn(model, 'resetMovement');
    const spyReset = spyOn(model, 'resetFilter');
    const spyFetch = spyOn(component, 'fetchMovement');

    component.removeFilter();

    expect(spyMovements).toHaveBeenCalled();
    expect(spyMovement).toHaveBeenCalled();
    expect(spyReset).toHaveBeenCalled();
    expect(spyFetch).toHaveBeenCalled();
  });

  it('movements$ with filter should be return 3 accounts', () => {
    modelMock.setInnerMovementtData = MovementsStateMock as any; // Data intereses tiene 3 accounts
    component.textFilter = 'intereses';
    component.movements$.subscribe((result: MovementsState) => {
      expect(result.account.operations.length).toEqual(3);
    });
  });

  it('hasMovements$ should be return true', () => {
    modelMock.setInnerMovementtData = MovementsStateOnlyCreditCardMock as any;
    component.hasMovements$.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
    });
  });
});
