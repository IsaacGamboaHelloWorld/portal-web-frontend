import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { StepOneComponent } from './step-one.component';

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      declarations: [StepOneComponent],
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
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should navigate', () => {
    expect(component.navigate.step1).toBe('/codigo-2fa/onboarding');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
