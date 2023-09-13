import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { AdvanceFacadeMock } from '../../../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { HowMuchComponent } from './how-much.component';

describe('HowMuchComponent', () => {
  let component: HowMuchComponent;
  let fixture: ComponentFixture<HowMuchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, CurrencyModule.forRoot()],
      declarations: [HowMuchComponent],
      providers: [
        StepService,
        ManipulateDomService,
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowMuchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formSubmit();
    component.numberFee();
    component.numberFee(false);
    expect(component).toBeTruthy();
  });
});
