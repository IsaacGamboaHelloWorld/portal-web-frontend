import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { OnBoardingContainer } from './onboarding-container.component';

describe('OnBoardingContainer', () => {
  let component: OnBoardingContainer;
  let fixture: ComponentFixture<OnBoardingContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnBoardingContainer],
      imports: [TestingModule],
      providers: [
        ManipulateDomService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be change value index and btn', () => {
    component.redirect();
    component.slider();
    expect(component.showSlider).toBeTruthy();
    component.index(false);
    expect(component.showButton).toBeFalsy();
  });
});
