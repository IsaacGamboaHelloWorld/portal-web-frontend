import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { HomeModel } from '../../home.model';
import { ProductDepositAccountComponent } from './product-deposit-account.component';

xdescribe('ProductDepositAccountComponent', () => {
  let component: ProductDepositAccountComponent;
  let fixture: ComponentFixture<ProductDepositAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ProductDepositAccountComponent],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDepositAccountComponent);
    component = fixture.componentInstance;
    component.product = ProductsMock.DEPOSIT_ACCOUNT[1];
    fixture.detectChanges();
  });

  it('should creates', () => {
    component.redirect('test', '144');
    expect(component).toBeTruthy();
  });

  it('should be validate font size', () => {
    spyOnProperty(component, 'hasProduct', 'get').and.returnValue(true);
  });
});
