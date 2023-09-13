import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from '@app/core/pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ActivateTcModel } from '../../store/model/activate-tc.model';
import { StepOneComponent } from './step-one.component';

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      declarations: [
        StepOneComponent,
        CardTypeclassPipe,
        CardTypeProductPipe,
        CardFranchiseTypePipe,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
      ],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: ActivateTcModel,
          useClass: ActivateTcModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.isStable();
  });

  it('form invalid when empty', () => {
    expect(component.formStepOne.valid).toBeFalsy();
  });

  it('should toggleInputType', () => {
    expect(component.toggleInputType()).toBe();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
