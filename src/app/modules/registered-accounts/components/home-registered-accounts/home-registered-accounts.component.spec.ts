import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TransferModelMock } from '../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RegisteredAccountsFacade } from './../../registered-accounts.facade';
import { HomeRegisteredAccountsComponent } from './home-registered-accounts.component';

describe('HomeRegisteredAccountsComponent', () => {
  let component: HomeRegisteredAccountsComponent;
  let fixture: ComponentFixture<HomeRegisteredAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [HomeRegisteredAccountsComponent],
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
    fixture = TestBed.createComponent(HomeRegisteredAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
