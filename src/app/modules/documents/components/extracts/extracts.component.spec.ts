import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TributaryModelMock } from '../../../../../../test-helpers/mocks/models/tributary.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DocumentsService } from '../../services/documents.service';
import { ExtractsModel } from '../../store/model/extracts.model';
import { HomeModelDocuments } from '../../store/model/home.model';

import { ExtractsComponent } from './extracts.component';

describe('ExtractsComponent', () => {
  let component: ExtractsComponent;
  let fixture: ComponentFixture<ExtractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ExtractsComponent, TypeCreditCardPipe],
      providers: [
        ManipulateDomService,
        DocumentsService,
        {
          provide: ExtractsModel,
          useClass: TributaryModelMock,
        },
        {
          provide: HomeModelDocuments,
          useClass: PaymentsV2ModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
