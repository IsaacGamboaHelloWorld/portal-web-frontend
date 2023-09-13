import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { MainContainerModelMock } from '../../../../../../test-helpers/mocks/models/main-container.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { AlertsMock } from '../../store/mocks/alerts.mock';
import { AlertsModel } from '../../store/model/alerts.model';

import { OnboardingComponent } from './onboarding.component';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let facade: AlertsModel;
  let facadeMock: AlertsMock;

  beforeEach(async(() => {
    facadeMock = new AlertsMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [OnboardingComponent],
      providers: [
        {
          provide: AlertsModel,
          useValue: facadeMock,
        },
        {
          provide: ApplicationModel,
          useClass: MainContainerModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(AlertsModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('alerts$', () => {
    const result = component.alerts$;
    expect(result).toEqual(facade.allAlerts$);
  });
});
