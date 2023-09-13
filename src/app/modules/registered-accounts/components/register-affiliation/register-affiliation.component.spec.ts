import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { TransferModelMock } from '../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RegisteredAccountsFacade } from '../../registered-accounts.facade';
import { RegisterAffiliationComponent } from './register-affiliation.component';

describe('RegisterAffiliationComponent', () => {
  let component: RegisterAffiliationComponent;
  let fixture: ComponentFixture<RegisterAffiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegisterAffiliationComponent],
      providers: [
        ManipulateDomService,
        NicknamesService,
        {
          provide: RegisteredAccountsFacade,
          useClass: TransferModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
