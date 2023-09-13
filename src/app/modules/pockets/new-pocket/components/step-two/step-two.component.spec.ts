import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { NewPocketFacade } from '../../new-pocket.facade';
import { StepTwoPocketsComponent } from './step-two.component';

describe('StepTwoPocketsComponent', () => {
  let component: StepTwoPocketsComponent;
  let fixture: ComponentFixture<StepTwoPocketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, CurrencyModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [StepTwoPocketsComponent],
      providers: [
        {
          provide: NewPocketFacade,
          useClass: PocketsModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoPocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
