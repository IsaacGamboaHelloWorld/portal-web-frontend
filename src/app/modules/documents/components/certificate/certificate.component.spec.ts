import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TributaryModelMock } from '../../../../../../test-helpers/mocks/models/tributary.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DocumentsService } from '../../services/documents.service';
import { CertificateModel } from '../../store/model/certificate.model';
import { HomeModelDocuments } from '../../store/model/home.model';

import { CertificateComponent } from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [CertificateComponent],
      providers: [
        DocumentsService,
        ManipulateDomService,
        {
          provide: CertificateModel,
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
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
