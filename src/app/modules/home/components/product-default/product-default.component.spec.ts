import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductDefaultComponent } from './product-default.component';

describe('ProductDefaultComponent', () => {
  let component: ProductDefaultComponent;
  let fixture: ComponentFixture<ProductDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      declarations: [ProductDefaultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ProductDefaultComponent);
    component = fixture.componentInstance;
    component.product = ProductsMock.CREDIT_CARD[1];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasProduct', () => {
    const result = component.hasProduct;
    expect(result).toBeTruthy();
  });

  it('execute redirect should be call encryptAesGcm', () => {
    const type = 'DEPOSIT_ACCOUNT';
    const id = '210040736803';
    const encrypt = 'krleklrkelrkelkslkds';
    const security = TestBed.get(SecurityService);
    const spySec = spyOn(security, 'encryptAesGcm').and.returnValue(
      Promise.resolve(encrypt),
    );

    component.redirect(type, id);

    expect(spySec).toHaveBeenCalledWith(id);
  });
});
