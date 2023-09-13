import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '@root/test-helpers/testing.module';

import { OtpAthModalComponent } from './otp-ath-modal.component';

describe('OtpModalComponent', () => {
  let component: OtpAthModalComponent;
  let fixture: ComponentFixture<OtpAthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpAthModalComponent],
      imports: [TestingModule],
      providers: [ManipulateDomService, FormBuilder],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpAthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
