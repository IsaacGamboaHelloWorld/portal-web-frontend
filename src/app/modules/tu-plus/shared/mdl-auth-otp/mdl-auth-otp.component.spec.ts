import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnComponent } from '@app/shared/btn/btn.component';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { MdlAuthOtpComponent } from './mdl-auth-otp.component';

describe('MdlAuthOtpComponent', () => {
  let component: MdlAuthOtpComponent;
  let fixture: ComponentFixture<MdlAuthOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MdlAuthOtpComponent],
      providers: [
        FormBuilder,
        ModalService,
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        BtnComponent,
        ManipulateDomService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlAuthOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MdlAuthOtpComponent', () => {
    expect(component).toBeTruthy();
  });
  it('emitClick', () => {
    component.approvalId = '123';
    expect(component.emitClick()).toBe();
  });

  xit('_submitForm', () => {
    const model = TestBed.get(YourPlusModel);
    (component as any)._submitForm;
    const spyRedemptionLoad = spyOn(model, 'redemptionLoad');
    expect(spyRedemptionLoad).toHaveBeenCalled();
  });

  it('_loadRedemption', () => {
    (component as any)._loadRedemption;
    component.redemption$.subscribe((data: any) => {
      expect(data).toBeTruthy();
    });
  });

  it('close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    component.close();
    expect(spyClose).toHaveBeenCalled();
  });
});
