import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@app/modules/advance/advance.facade';
import { HomeModel } from '@app/modules/home/home.model';
import { BtnComponent } from '@app/shared/btn/btn.component';
import { CardChangeDataComponent } from '@app/shared/card-change-data/card-change-data.component';
import { CardNotificationComponent } from '@app/shared/card-notification/card-notification.component';
import { DsCreditCardComponent } from '@app/shared/ds/ds-credit-card/ds-credit-card.component';
import { DsMaskCreditCardPipe } from '@app/shared/ds/ds-credit-card/pipes/ds-mask-credit-card.pipe';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { AdvanceFacadeMock } from '@root/test-helpers/mocks/models/advance.facade.mock';
import { HomeModelMock } from '@root/test-helpers/mocks/models/home.model.mock';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { YourPlusModel } from '../../store/models/your-plus.model';

import { StepThreeComponent } from './step-three.component';

xdescribe('StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;
  let _model: YourPlusModel;
  let _home_model: HomeModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [
        StepThreeComponent,
        CardChangeDataComponent,
        DsCreditCardComponent,
        BtnComponent,
        CardNotificationComponent,
        CardTypeclassPipe,
        DsMaskCreditCardPipe,
        CardFranchiseTypePipe,
        RemoveValuePipe,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },
        ModalService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeComponent);
    _model = TestBed.get(YourPlusModel);
    _home_model = TestBed.get(HomeModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create StepThreeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('redemption$', () => {
    const result = component.redemption$;
    expect(result).toEqual(_model.redemption$);
  });
  it('otpGeneration$', () => {
    const result = component.otpGeneration$;
    expect(result).toEqual(_model.otpGeneration$);
  });
  it('productsOrigin$', () => {
    component.productsOrigin$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(JSON.stringify([]));
    });
  });
});
