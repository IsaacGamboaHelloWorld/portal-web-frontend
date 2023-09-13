import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '@root/test-helpers/testing.module';
import { AlertsMock } from '../../store/mocks/alerts.mock';
import { AlertsModel } from '../../store/model/alerts.model';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let facade: AlertsModel;
  let facadeMock: AlertsMock;
  beforeEach(async(() => {
    facadeMock = new AlertsMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ListComponent],
      providers: [
        ManipulateDomService,
        {
          provide: AlertsModel,
          useValue: facadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(AlertsModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
