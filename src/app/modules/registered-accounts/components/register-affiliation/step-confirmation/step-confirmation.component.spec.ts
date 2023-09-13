import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisteredAccountsFacade } from '@app/modules/registered-accounts/registered-accounts.facade';
import { TransferModelMock } from '../../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { StepConfirmationComponent } from './step-confirmation.component';

describe('RegisterAffiliation - StepConfirmationComponent', () => {
  let component: StepConfirmationComponent;
  let fixture: ComponentFixture<StepConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepConfirmationComponent],
      providers: [
        {
          provide: RegisteredAccountsFacade,
          useClass: TransferModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
