import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { EditPocketFacade } from '../../edit-pocket.facade';

import { DeleteStepOneComponent } from './delete-step-one.component';

describe('DeleteStepOneComponent', () => {
  let component: DeleteStepOneComponent;
  let fixture: ComponentFixture<DeleteStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteStepOneComponent],
      imports: [
        TestingModule,
        ReactiveFormsModule,
        CurrencyModule.forRoot('es-US'),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: EditPocketFacade,
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
    fixture = TestBed.createComponent(DeleteStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
