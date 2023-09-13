import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';

import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepTwoComponent],
      imports: [
        TestingModule,
        ReactiveFormsModule,
        CurrencyModule.forRoot('es-US'),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: MovePocketPocketsFacade,
          useValue: PocketsModelMock,
        },
        {
          provide: HomePocketsFacade,
          useValue: PocketsModelMock,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
