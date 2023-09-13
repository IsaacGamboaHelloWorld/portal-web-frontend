import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { AlertsMock } from '../../store/mocks/alerts.mock';
import { AlertsModel } from '../../store/model/alerts.model';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let facade: AlertsModel;
  let facadeMock: AlertsMock;

  beforeEach(async(() => {
    facadeMock = new AlertsMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HomeComponent],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(AlertsModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
