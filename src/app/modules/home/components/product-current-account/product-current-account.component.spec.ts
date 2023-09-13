import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { HomeModel } from '../../home.model';
import { ProductCurrentAccountComponent } from './product-current-account.component';

xdescribe('ProductCurrentAccountComponent', () => {
  let component: ProductCurrentAccountComponent;
  let fixture: ComponentFixture<ProductCurrentAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ProductCurrentAccountComponent],
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
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ProductCurrentAccountComponent);
    component = fixture.componentInstance;
    component.product = ProductsMock.DEPOSIT_ACCOUNT[1];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be validate font size', () => {
    spyOnProperty(component, 'hasProduct', 'get').and.returnValue(true);
  });
});
