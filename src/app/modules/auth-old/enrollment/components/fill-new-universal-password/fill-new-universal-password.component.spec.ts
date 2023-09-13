import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { AuthModelMock } from '../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { FillNewUniversalPasswordComponent } from './fill-new-universal-password.component';

describe('FillNewUniversalPasswordComponent', () => {
  let component: FillNewUniversalPasswordComponent;
  let fixture: ComponentFixture<FillNewUniversalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        FormBuilder,
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [FillNewUniversalPasswordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillNewUniversalPasswordComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
