import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { TransferModelMock } from '@root/test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { StepTwoComponent } from './step-two.component';

xdescribe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepTwoComponent],
      imports: [
        TestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        CurrencyModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        TealiumUtagService,
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.submitForm();
    expect(component).toBeTruthy();
  });
});
