import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';

import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../../../core/pipes/remove-value.pipe';
import { PublicServicesFacade } from '../../../public-services.facade';
import { BillerDetailState } from '../../../store/reducers/biller-detail.reducer';
import { PaymentServiceFacade } from '../../payment.facade';
import { NavigatePayment } from '../navigate/routes';
import { StepConfirmComponent } from './step-confirm.component';

describe('StepConfirmComponent for SP', () => {
  let component: StepConfirmComponent;
  let fixture: ComponentFixture<StepConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [StepConfirmComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nexStep', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.nexStep();
    expect(spy).toHaveBeenCalledWith([component.navigateInternal.step_end]);
  });

  it('navigateInternal', () => {
    const result = component.navigateInternal;
    expect(result).toEqual(NavigatePayment);
  });

  it('selectedPayment$', () => {
    const parent = TestBed.get(PublicServicesFacade);
    const mock = parent.selectedPayment$ as Observable<BillerDetailState>;
    const result = component.selectedPayment$.toPromise();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mock.toPromise()));
  });
});
