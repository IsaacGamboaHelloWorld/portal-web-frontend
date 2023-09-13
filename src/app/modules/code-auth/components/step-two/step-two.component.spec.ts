import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      declarations: [StepTwoComponent],
      providers: [
        ManipulateDomService,
        {
          provide: CodeAuthModel,
          useClass: ActivateTcModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
