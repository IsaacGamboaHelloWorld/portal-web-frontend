import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { of } from 'rxjs';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ModalService } from '../modal/services/modal.service';
import { SearchPipe } from './components/search/search.pipe';

import { HistoricComponent } from './historic.component';

describe('HistoricComponent', () => {
  let component: HistoricComponent;
  let fixture: ComponentFixture<HistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HistoricComponent, SearchPipe, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ModalService, ManipulateDomService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resultPaginator', () => {
    const event = [{}];
    component.resultPaginator(event);
    expect(component.dataPaginator).toEqual(event);
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
    const modalTest = TestBed.get(ModalService);
    const spy = spyOn(modalTest, 'open').and.callFake(() => {});
    component.openFilter();
    expect(spy).toHaveBeenCalled();
  });

  it('_actionsModal actionAgree', () => {
    const modal = TestBed.get(ModalService);
    const data = {
      instance: {
        componentRef: {
          instance: {
            actionAgree: of(''),
          },
        },
      },
    };

    modal._dialogComponentRef = data;
    (component as any)._actionsModal();

    expect(component.hasFilter).toBeFalsy();
  });

  it('removeFilter', () => {
    component.hasFilter = true;
    component.removeFilter();
    expect(component.hasFilter).toBeFalsy();
  });
});
