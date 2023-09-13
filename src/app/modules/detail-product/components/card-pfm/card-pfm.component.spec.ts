import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from './../../../../../../test-helpers/testing.module';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailProductPFMModel } from '@app/modules/detail-product-pfm/detail-product-pfm.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { DetailProductPfmMock } from '../../../../../../test-helpers/mocks/models/detail-product-pfm.mock';
import { CardPfmComponent } from './card-pfm.component';

describe('CardPfmComponent', () => {
  let component: CardPfmComponent;
  let fixture: ComponentFixture<CardPfmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [CardPfmComponent],
      providers: [
        SecurityService,
        ManipulateDomService,
        Security,
        {
          provide: DetailProductPFMModel,
          useClass: DetailProductPfmMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
