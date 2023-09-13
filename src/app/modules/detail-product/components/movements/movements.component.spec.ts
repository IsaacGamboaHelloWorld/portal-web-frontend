import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MovementsStateMock,
  MovementsStateOnlyCreditCardMock,
} from './../../../../../../test-helpers/mocks/data/movements.mock';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { MovementsComponent } from './movements.component';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { SearchTextMovementPipe } from '@modules/detail-product/pipes/search-text-movement/search-text-movement.pipe';

describe('MovementsComponent', () => {
  let component: MovementsComponent;
  let fixture: ComponentFixture<MovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, FormsModule],
      declarations: [MovementsComponent, SearchTextMovementPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ModalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('spy on nextpage', () => {
    const spy = spyOn(component, 'nextPage');
    component.nextPage();
    expect(spy).toHaveBeenCalled();
  });

  it('spy on prevpage', () => {
    const spy = spyOn(component, 'prevPage');
    component.prevPage();
    expect(spy).toHaveBeenCalled();
  });

  it('test internal Properties', () => {
    spyOnProperty(component, 'haveMore', 'get').and.returnValue(true);
    spyOnProperty(component, 'haveLess', 'get').and.returnValue(true);
    spyOnProperty(component, 'totalPages', 'get').and.returnValue(10);
  });

  it('spy on CutArray', () => {
    const spy = spyOn(component, 'cutArray');
    component.cutArray(10, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('totalPages with typeAccount = credit_card and 3 creditCardMovements', () => {
    component.movements = MovementsStateOnlyCreditCardMock.account as any; // have 3 creditCardMovements
    component.typeAccount = 'credit_card';
    const result = component.totalPages;
    expect(result).toEqual(1);
  });

  it('totalPages with typeAccount = credit_card, 3 creditCardMovements and currentPage > totalPages', () => {
    const currentPage = 2;
    component.movements = MovementsStateOnlyCreditCardMock.account as any; // have 3 creditCardMovements
    component.typeAccount = 'credit_card';
    component.currentPage = currentPage;
    const result = component.totalPages;
    expect(result).toEqual(currentPage);
  });

  it('totalPages with typeAccount = current_account and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'current_account';
    const result = component.totalPages;
    expect(result).toEqual(1);
  });

  it('totalPages with typeAccount = deposit_account and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';
    const result = component.totalPages;
    expect(result).toEqual(1);
  });

  it('totalPages with typeAccount is empty and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = '';
    const result = component.totalPages;
    expect(result).toEqual(0);
  });

  it('totalRecords with typeAccount = credit_card and 3 creditCardMovements', () => {
    component.movements = MovementsStateOnlyCreditCardMock.account as any; // have 3 creditCardMovements
    component.typeAccount = 'credit_card';
    const result = component.totalRecords;
    expect(result).toEqual(3);
  });

  it('totalRecords with typeAccount = current_account and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'current_account';
    const result = component.totalRecords;
    expect(result).toEqual(10);
  });

  it('totalRecords with typeAccount = deposit_account and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';
    const result = component.totalRecords;
    expect(result).toEqual(10);
  });

  it('totalRecords with typeAccount is empty and 10 operations', () => {
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = '';
    const result = component.totalRecords;
    expect(result).toEqual(0);
  });

  it('hasMovements with type account = certified_deposit_term', () => {
    component.typeAccount = 'certified_deposit_term';
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.isCDT = false;
    const result = component.hasMovements;
    expect(component.isCDT).toBeTruthy();
    expect(result).toBeTruthy();
  });

  it('haveLess should be return true', () => {
    component.currentPage = 1;
    const result = component.haveLess;
    expect(result).toBeTruthy();
  });

  it('haveMore should be return true', () => {
    component.currentPage = 1;
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';
    const result = component.haveMore;
    expect(result).toBeTruthy();
  });

  it('nextPage when currentPage < totalPages', () => {
    component.currentPage = 0;
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';

    const spy = spyOn(component, 'cutArray');

    component.nextPage();
    expect(component.currentPage).toEqual(1);
    expect(spy).toHaveBeenCalledWith(10, 1);
  });

  it('nextPage when currentPage > totalPages', () => {
    component.currentPage = 2;
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';

    const spy = spyOn(component, 'cutArray');

    component.nextPage();
    expect(component.currentPage).toEqual(2);
    expect(spy).toHaveBeenCalledWith(10, 2);
  });

  it('prevPage when currentPage > 1', () => {
    component.currentPage = 2;

    const spy = spyOn(component, 'cutArray');

    component.prevPage();
    expect(component.currentPage).toEqual(1);
    expect(spy).toHaveBeenCalledWith(10, 1);
  });

  it('prevPage when currentPage <= 1', () => {
    component.currentPage = 1;

    const spy = spyOn(component, 'cutArray');

    component.prevPage();
    expect(component.currentPage).toEqual(1);
    expect(spy).toHaveBeenCalledWith(10, 1);
  });

  it('ngOnInit', () => {
    component.currentPage = 2;
    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.typeAccount = 'deposit_account';

    const spy = spyOn(component, 'cutArray');

    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(10, 2);
  });

  it('get textFilter', () => {
    const text = 'lalala';
    (component as any)._textFilter = text;
    const result = component.textFilter;
    expect(result).toEqual(text);
  });

  it('set textFilter', () => {
    const spy = spyOn(component, 'cutArray');
    component.currentPage = 1;
    const text = 'lalala';
    component.textFilter = text;
    expect((component as any)._textFilter).toEqual(text);
    expect(spy).toHaveBeenCalledWith(10, 1);
  });

  it('cutArray with creditCardMovements', () => {
    const result = [
      MovementsStateOnlyCreditCardMock.account.creditCardMovements[0],
      MovementsStateOnlyCreditCardMock.account.creditCardMovements[1],
    ];
    component.movements = MovementsStateOnlyCreditCardMock.account as any; // have 10 operations
    component.cutArray(2, 1);
    expect(JSON.stringify(component.dataToPage)).toEqual(
      JSON.stringify(result),
    );
  });

  it('cutArray with operations', () => {
    const result = [
      MovementsStateMock.account.operations[0],
      MovementsStateMock.account.operations[1],
    ];

    component.movements = MovementsStateMock.account as any; // have 10 operations
    component.cutArray(2, 1);
    expect(JSON.stringify(component.dataToPage)).toEqual(
      JSON.stringify(result),
    );
  });

  it('cutArray without data', () => {
    component.movements = [] as any;
    component.cutArray(2, 1);
    expect(JSON.stringify(component.dataToPage)).toEqual(undefined);
  });
});
