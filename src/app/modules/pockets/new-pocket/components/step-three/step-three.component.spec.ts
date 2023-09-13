import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { NewPocketFacade } from '../../new-pocket.facade';
import { StepThreePocketComponent } from './step-three.component';

describe('StepThreePocketComponent', () => {
  let component: StepThreePocketComponent;
  let fixture: ComponentFixture<StepThreePocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, CurrencyModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [StepThreePocketComponent],
      providers: [
        {
          provide: NewPocketFacade,
          useClass: PocketsModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([NewPocketFacade], (bla: NewPocketFacade) => {
    bla.pocketAnswer$ = PocketsModelMock.pocketAnswer$;
    fixture = TestBed.createComponent(StepThreePocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
