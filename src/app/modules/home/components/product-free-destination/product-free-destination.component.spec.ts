import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { StatusProductPipe } from '@app/modules/detail-product/pipes/status-product/status-product.pipe';
import { Security } from '@app/modules/security/utils/security';
import { SecurityService } from '@modules/security/services/security.service';
import { FreeDestinationDetailMock } from '../../../../../../test-helpers/mocks/data/freeDestinations.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { ProductFreeDestinationComponent } from './product-free-destination.component';

describe('ProductFreeDestinationComponent', () => {
  let component: ProductFreeDestinationComponent;
  let fixture: ComponentFixture<ProductFreeDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [
        ProductFreeDestinationComponent,
        StatusProductPipe,
        RemoveValuePipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFreeDestinationComponent);
    component = fixture.componentInstance;
    component.product = FreeDestinationDetailMock.freeDestinationCredit as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect', () => {
    const accountIdentifier = '112200305';
    const encrypt = 'krleklrkelrkelkslkds';

    const security = TestBed.get(SecurityService);
    const spySec = spyOn(security, 'encryptAesGcm').and.returnValue(
      Promise.resolve(encrypt),
    );
    component.redirect(accountIdentifier);

    expect(spySec).toHaveBeenCalledWith(accountIdentifier);
  });
});
