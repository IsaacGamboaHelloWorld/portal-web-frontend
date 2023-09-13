import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { ButtonRedirectCdtComponent } from './button-redirect-cdt.component';

describe('ButtonRedirectCdtComponent', () => {
  let component: ButtonRedirectCdtComponent;
  let fixture: ComponentFixture<ButtonRedirectCdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [SecurityService, Security],
      declarations: [ButtonRedirectCdtComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ButtonRedirectCdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rediRet for if', () => {
    const offer = {
      img: '/open-cdt@3x.png',
      name: 'Ahorra con tu CDT',
      title: 'Abre un CDT sin salir de casa',
      desc: 'Invierte tu dinero con tasas preferenciales y cuotas fijas.',
      btn: 'Me interesa',
    };
    component.offer = offer;
    const spy = spyOn(window, 'open');
    component.rediRet();
    expect(spy).toHaveBeenCalled();
  });

  it('rediRet for else', () => {
    const offer = {
      img: '/open-account-saving@3x.png',
      name: 'Cuentas de ahorro',
      title: 'Abre tu Cuenta de Ahorros',
      desc: 'Con tansferencias gratuitas entre cuentas del grupo Aval.',
      btn: 'Abrir una cuenta',
    };
    component.offer = offer;
    const spy = spyOn(window, 'open');
    component.rediRet();
    expect(spy).not.toHaveBeenCalled();
  });
});
