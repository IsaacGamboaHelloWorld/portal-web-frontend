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
import { EditPocketFacade } from '../../edit-pocket.facade';
import { EditStepOneComponent } from './edit-step-one.component';

describe('EditStepOneComponent', () => {
  let component: EditStepOneComponent;
  let fixture: ComponentFixture<EditStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStepOneComponent],
      imports: [TestingModule, ReactiveFormsModule, CurrencyModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: EditPocketFacade,
          useClass: PocketsModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([EditPocketFacade], (bla: EditPocketFacade) => {
    bla.activePocket$ = PocketsModelMock.activePocket$;
    bla.deletePocket$ = PocketsModelMock.deletePocket$;
    bla.editPocket$ = PocketsModelMock.editPocket$;

    fixture = TestBed.createComponent(EditStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
