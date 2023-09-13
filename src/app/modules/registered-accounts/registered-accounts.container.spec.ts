import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { RegisteredAccountsFacade } from '@modules/registered-accounts/registered-accounts.facade';
import { RegisteredAccountsContainer } from 'app/modules/registered-accounts/registered-accounts.container';
import { TransferModelMock } from '../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';

describe('RegisteredAccountsContainer', () => {
  let component: RegisteredAccountsContainer;
  let fixture: ComponentFixture<RegisteredAccountsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [RegisteredAccountsContainer],
      providers: [
        ManipulateDomService,
        {
          provide: RegisteredAccountsFacade,
          useClass: TransferModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredAccountsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
