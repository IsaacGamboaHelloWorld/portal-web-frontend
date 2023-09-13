import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { RechargeModelMock } from '../../../../../../test-helpers/mocks/models/recharge.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { StepOneComponent } from './step-one.component';

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, CurrencyModule.forRoot()],
      declarations: [StepOneComponent],
      providers: [
        {
          provide: RechargeModel,
          useClass: RechargeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retry', () => {
    const model = TestBed.get(RechargeModel);
    const spy = spyOn(model, 'loadOperators');

    component.retry();

    expect(spy).toHaveBeenCalled();
  });

  it('submitForm', () => {
    const model = TestBed.get(RechargeModel);
    const spySet = spyOn(model, 'setFormOne');
    const spyStep = spyOn(model, 'setStep');

    component.submitForm();

    expect(spySet).toHaveBeenCalled();
    expect(spyStep).toHaveBeenCalled();
  });

  it('loadAmount with loading true and amount is null', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: true,
      amount: 1000,
    };
    const text = 'message';
    const amount = null;
    const textLoading = 'loading';

    const result = component.loadAmount(product, text, amount, textLoading);

    expect(result).toEqual(`- ${textLoading}...`);
  });

  it('loadAmount with loaded true and amount', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      loaded: true,
      amount: 1000,
    };
    const text = 'message';
    const amount = '1000';
    const textLoading = 'loading';

    const result = component.loadAmount(product, text, amount, textLoading);

    expect(result).toEqual(`- ${text} ${amount}`);
  });

  it('loadAmount for else', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      loaded: false,
      amount: 1000,
    };
    const text = 'message';
    const amount = null;
    const textLoading = 'loading';

    const result = component.loadAmount(product, text, amount, textLoading);

    expect(result).toEqual('');
  });
});
