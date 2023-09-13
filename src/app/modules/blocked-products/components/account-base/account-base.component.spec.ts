import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CardFranchiseTypePipe } from '@core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@core/pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from '@core/pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from '@core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@core/pipes/credit-card-mask/credit-card-mask.pipe';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PopupAccountLockConfirmationComponent } from '../popup-account-lock-confirmation/popup-account-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';
import { AccountBaseComponent } from './account-base.component';

describe('CardBaseComponent', () => {
  let component: AccountBaseComponent;
  let fixture: ComponentFixture<AccountBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ManipulateDomService, ModalService],
      declarations: [
        AccountBaseComponent,
        CardTypeclassPipe,
        CardTypeProductPipe,
        CardFranchiseTypePipe,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openOnBlockedStatus', () => {
    component.openOnBlockedStatus();

    expect(PopupInfoBlockedComponent.prototype.secondaryContent).toEqual(null);
    expect(
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent,
    ).toBeTruthy();
  });

  it('openInfo for BLOCKED', () => {
    component.data = {
      status: 'BLOCKED',
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.openInfo('');

    expect(spyModal).toHaveBeenCalledWith(
      PopupInfoBlockedComponent,
      true,
      `${STANDARD_WIDTH} not-button-close`,
      true,
      component.data,
    );
  });

  it('openInfo for ACTIVE', () => {
    component.data = {
      status: 'ACTIVE',
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.openInfo('');

    expect(spyModal).toHaveBeenCalledWith(
      PopupAccountLockConfirmationComponent,
      true,
      `${STANDARD_WIDTH}  not-button-close`,
      true,
      component.data,
    );
  });
});
