import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PayStackModelMock } from '../../../../../../test-helpers/mocks/models/payStack.model.mocks';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { StepOneComponent } from './step-one.component';

describe('StepOneComponent PayStack', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [StepOneComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PayStackModel,
          useClass: PayStackModelMock,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
