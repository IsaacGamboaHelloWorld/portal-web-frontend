import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementsStateMock } from '../../../../test-helpers/mocks/data/movements.mock';

import { TestingModule } from '../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../core/pipes/remove-value.pipe';
import { ManipulateDomService } from '../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../modal/services/modal.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [TableComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ModalService, ManipulateDomService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('test internal Properties', () => {
    spyOnProperty(component, 'haveMore', 'get').and.returnValue(true);
    spyOnProperty(component, 'haveLess', 'get').and.returnValue(true);
    spyOnProperty(component, 'totalPages', 'get').and.returnValue(10);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit without call cutArray', () => {
    const spy = spyOn(component, 'cutArray');
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('ngOnInit should be called cutArray', () => {
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;
    component.currentPage = 2;
    const spy = spyOn(component, 'cutArray');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(10, 2);
  });

  it('spy on CutArray', () => {
    const spy = spyOn(component, 'cutArray');
    component.cutArray(10, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('nextPage curentPage should be increment', () => {
    component.currentPage = 0;
    component.totalRecords = 10;
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;

    component.nextPage();

    expect(component.currentPage).toEqual(1);
  });

  it('nextPage curentPage should be 0', () => {
    component.currentPage = 0;
    component.movements = {
      data: [],
    } as any;
    component.nextPage();

    expect(component.currentPage).toEqual(0);
  });

  it('totalPages should return 1', () => {
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;
    const result = 1;
    expect(result).toEqual(1);
  });

  it('totalPages should return 1', () => {
    component.totalRecords = 0;
    const result = component.totalPages;
    expect(result).toEqual(1);
  });

  it('totalRecords should return 10', () => {
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;
    component.totalRecords = 10;
    const result = component.totalRecords;
    expect(result).toEqual(10);
  });

  it('totalRecords should return 0', () => {
    component.movements = {
      data: [],
    } as any;
    const result = component.totalRecords;
    expect(result).toEqual(0);
  });

  it('hasMovements', () => {
    const result = component.hasMovements;
    expect(result).toBeFalsy();
  });

  it('isSafari', () => {
    const result = component.isSafari;
    expect(result).toBeFalsy();
  });

  it('haveLess should be return true', () => {
    component.currentPage = 1;
    const result = component.haveLess;
    expect(result).toBeTruthy();
  });

  it('haveMore', () => {
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;
    component.currentPage = 1;
    const result = component.haveMore;
    expect(result).toBeTruthy();
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

  it('openFilter is called', () => {
    component.movements = {
      data: MovementsStateMock.account.operations, // have 10 operations
    } as any;
    const modalTest = TestBed.get(ModalService);
    const spy = spyOn(modalTest, 'open').and.callFake(() => {});
    component.openFilter();
    expect(spy).toHaveBeenCalled();
  });
});
