import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationModel } from '@app/application.model';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductCdtComponent } from './product-cdt.component';

xdescribe('ProductCdtComponent', () => {
  let component: ProductCdtComponent;
  let fixture: ComponentFixture<ProductCdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ProductCdtComponent, RemoveValuePipe],
      providers: [
        SecurityService,
        Security,
        ManipulateDomService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.product = {
      ...ProductsMock.CERTIFIED_DEPOSIT_TERM[1],
      id: '',
    };
    const dom = TestBed.get(ManipulateDomService);
    spyOn(dom, 'scrollTop');

    component.redirect('test', '144');

    expect(component).toBeTruthy();
  });
});
