import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { fireEvent } from '@testing-library/dom';
import { ApplicationModelMock } from '../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { LottieModule } from '../lottie/lottie.module';
import { WebAuthnService } from '../web-authn/web-authn.service';
import { Action } from './models/action-code';
import { Challenge } from './models/challenge-type';
import { TwoFactorAuthComponent } from './twofactorauth.component';

describe('TwofactorauthComponent', () => {
  let component: TwoFactorAuthComponent;
  let fixture: ComponentFixture<TwoFactorAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwoFactorAuthComponent],
      imports: [
        TestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        LottieModule,
      ],
      providers: [
        ManipulateDomService,
        WebAuthnService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorAuthComponent);
    component = fixture.componentInstance;
    component.challengeResponse = {
      action: Action.CHALLENGE,
      challengeInformation: {
        challenge: Challenge.TOTP,
        parameters: {
          length: 6,
        },
        resend: {
          enabled: false,
        },
      },
      success: true,
      transactionId: '1234567890',
      request: {
        ipAddress: '1.1.1.1',
      },
      dateTime: '2020-12-10T16:31:23.942',
    };
    component.disabledContinue = true;
    const continuebtn = document.createElement('BUTTON');
    document.body.appendChild(continuebtn);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to listen HostListener on onClick', () => {
    //
    const cancelbtn = document.createElement('BUTTON');
    cancelbtn.setAttribute('twofa-btn-cancel', null);
    component.onClick(cancelbtn);
    //
    const continuebtn = document.createElement('BUTTON');
    continuebtn.setAttribute('twofa-btn-continue', null);
    component.onClick(continuebtn);
    //
    const newcodebtn = document.createElement('BUTTON');
    newcodebtn.setAttribute('twofa-btn-new-code', null);
    component.onClick(newcodebtn);
    expect(component.onClick).toBeDefined();
  });

  it('should call to method goToNextInput', () => {
    const control = component.formG.get('char0');
    control.setValue(2);
    const keyEvent = new KeyboardEvent('keyup', { key: '1' });
    fireEvent(document.getElementById('char0'), keyEvent);
    fixture.detectChanges();
    expect(control.value).toEqual('2');
    expect(control.value).toEqual('2');
  });

  it('should to listen onClick with valid values', () => {
    component.inputs.forEach((key) => {
      component.formG.get(`char${key}`).patchValue(2);
    });
    expect(component.formG.valid).toBeTruthy();
  });

  it('should to paste into inputs', () => {
    function FakePasteEvent(options: any): void {
      this.clipboardData = {
        dataType: options.dataType,
        data: options.data,
        getData(type: string): void {
          return this.data;
        },
      };
      // tslint:disable-next-line: no-unused-expression
      this.preventDefault = () => void {};
    }
    const ev = new FakePasteEvent({
      dataType: 'text/plain',
      data: '12345678',
    });
    component.onPaste(ev);
    expect(component.formG.get('char3').value).toBe('4');
  });
});
