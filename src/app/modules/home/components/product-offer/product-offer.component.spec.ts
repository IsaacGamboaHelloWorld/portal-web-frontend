import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductOfferComponent } from './product-offer.component';

describe('ProductOfferComponent', () => {
  let component: ProductOfferComponent;
  let fixture: ComponentFixture<ProductOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [SecurityService, Security],
      declarations: [ProductOfferComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ProductOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rediRet for if', () => {
    const offer = {
      img: '/open-account-saving@3x.png',
      name: 'Cuentas de ahorro',
      title: 'Abre tu Cuenta de Ahorros',
      desc: 'Con tansferencias gratuitas entre cuentas del grupo Aval.',
      btn: 'Abrir una cuenta',
    };
    component.offer = offer;
    const spy = spyOn(window, 'open');
    component.rediRet(null, 'Cuentas de ahorro');
    expect(spy).toHaveBeenCalled();
  });
});
