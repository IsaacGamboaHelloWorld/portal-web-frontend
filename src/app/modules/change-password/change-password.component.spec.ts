import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileModelMock } from '../../../../test-helpers/mocks/models/user-profile.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordModel } from './change-password.model';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [ChangePasswordComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ChangePasswordModel,
          useClass: UserProfileModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
