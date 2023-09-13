import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PayStackModelMock } from '../../../../../../test-helpers/mocks/models/payStack.model.mocks';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent PayStack', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepTwoComponent],
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
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigatePayStack);
  });

  it('infoPaystack', () => {
    const model = TestBed.get(PayStackModel);
    const result = component.infoPaystack;
    expect(result).toEqual(model.stepOne$);
  });

  it('_setStep', () => {
    const step = 1;
    const model = TestBed.get(PayStackModel);
    const spy = spyOn(model, 'setStep');
    component._setStep(step);
    expect(spy).toHaveBeenCalledWith({ step });
  });

  it('onInit', () => {
    const spy = spyOn(component as any, '_setStep');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('submitData', () => {
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');
    const spy = spyOn(component as any, '_setStep');

    component.submitData();

    expect(spy).toHaveBeenCalledWith(3);
    expect(spyNav).toHaveBeenCalledWith([component.navigate.step3]);
  });
});
