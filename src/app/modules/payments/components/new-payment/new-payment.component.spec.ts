import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { of } from 'rxjs';

import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { PaymentModel } from '../../payment.model';
import { NewPaymentComponent } from './new-payment.component';

describe('NewPaymentComponent', () => {
  let component: NewPaymentComponent;
  let fixture: ComponentFixture<NewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPaymentComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        ModalService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openAlert', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    const spyAction = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();

    component.openAlert();

    expect(spyModal).toHaveBeenCalledWith(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);

    expect(spyAction).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal with _dialogComponentRef', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              title: 'PAYMENTS_PSE.POPUP_CLOSE.TEXT',
              img: '/delete.png',
              btnCancel: 'CANCEL',
              btnAgree: 'PAYMENTS_PSE.POPUP_CLOSE.YES_OPT',
              actionCancel: {
                pipe: () => of(),
              },
              actionAgree: {
                pipe: () => of(),
              },
            },
          },
        },
      },
    };

    (component as any).modalService = mockModal;

    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();

    mockModal._dialogComponentRef.instance.componentRef.instance.actionCancel
      .pipe()
      .subscribe((_data: any) => {
        expect(spyClose).toHaveBeenCalled();
      });
  });

  it('_actionsModal without _dialogComponentRef', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();
    expect(spyClose).not.toHaveBeenCalled();
  });

  it('setStep', () => {
    const step = 1;
    TestBed.get(PaymentModel);
    component.setStep(step);
  });
});
