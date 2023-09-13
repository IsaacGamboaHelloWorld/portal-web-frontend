import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpUrlEncodingCodec } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ModalSuccessComponent } from './modal-success.component';

describe('ModalSuccessComponent', () => {
  let component: ModalSuccessComponent;
  let fixture: ComponentFixture<ModalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuccessComponent],
      imports: [TestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        HttpUrlEncodingCodec,
        SecurityService,
        Security,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ModalSuccessComponent', () => {
    expect(component).toBeTruthy();
  });

  it('redirect', () => {
    const spy = spyOn(window, 'open');
    const url = `${environment.url_redirect_tuplus}`;
    component.redirect();
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });
});
