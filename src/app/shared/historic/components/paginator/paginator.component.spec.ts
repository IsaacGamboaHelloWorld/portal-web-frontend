import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { DialogConfigMock } from '../../../../../../test-helpers/mocks/models/dialog-popup-block.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent, RemoveValuePipe],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: DialogConfig,
          useClass: DialogConfigMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nextPage for totalPage is equal to count', () => {
    component.totalPages = 10;
    component.count = 10;
    component.nextPage();
    expect(component.count).toEqual(10);
  });

  it('nextPage for totalPage is not equal to count', () => {
    component.totalPages = 10;
    component.count = 5;
    component.nextPage();
    expect(component.count).toEqual(6);
  });

  it('prevPage', () => {
    component.count = 1;
    component.prevPage();
    expect(component.count).toEqual(1);
  });

  it('setDataPaginator', () => {
    const filter = 'search';
    const dataDate = [];
    const data = [];

    component.hasFilter = true;
    component.dataDate = dataDate;
    component.data = data;

    const result = component.setDataPaginator(filter, dataDate);

    expect(JSON.stringify(data)).toEqual(JSON.stringify(result));
  });
});
