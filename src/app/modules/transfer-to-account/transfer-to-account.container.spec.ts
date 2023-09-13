import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransferModelMock } from '../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { TransferToAccountContainer } from './transfer-to-account.container';
import { TransferModel } from './transfer.model';

describe('TransferToAccountContainer', () => {
  let component: TransferToAccountContainer;
  let fixture: ComponentFixture<TransferToAccountContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [TransferToAccountContainer],
      providers: [
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToAccountContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
