import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { AlertsMock } from '../../store/mocks/alerts.mock';
import { AlertsModel } from '../../store/model/alerts.model';

import { CreateAlertComponent } from './create.component';

describe('CreateAlertComponent', () => {
  let component: CreateAlertComponent;
  let fixture: ComponentFixture<CreateAlertComponent>;
  let facade: AlertsModel;
  let facadeMock: AlertsMock;

  beforeEach(async(() => {
    facadeMock = new AlertsMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CreateAlertComponent],
      providers: [
        ManipulateDomService,
        {
          provide: AlertsModel,
          useValue: facadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlertComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(AlertsModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setStep', () => {
    const step = 1;
    component.setStep(step);
    expect(component.step).toEqual(step);
  });
});
