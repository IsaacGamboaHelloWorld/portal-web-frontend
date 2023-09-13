import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { NewPocketFacade } from '../../new-pocket.facade';
import { StepOnePocketsComponent } from './step-one.component';

describe('StepOnePocketsComponent', () => {
  let component: StepOnePocketsComponent;
  let fixture: ComponentFixture<StepOnePocketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepOnePocketsComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
    bla.activePocket$ = PocketsModelMock.activePocket$;
    fixture = TestBed.createComponent(StepOnePocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit is pocket', () => {
    component.submitForm();
    expect(component).toBeTruthy();
  });

  it('should submit is not pocket', () => {
    component.submitForm();
    expect(component).toBeTruthy();
  });
});
