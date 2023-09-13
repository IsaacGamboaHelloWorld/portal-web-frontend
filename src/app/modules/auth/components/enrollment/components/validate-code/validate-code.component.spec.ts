import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { AuthModelMock } from '../../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { AuthModel } from '../../../../store/model/auth.model';
import { ValidateCodeComponent } from './validate-code.component';

describe('ValidateCodeComponent', () => {
  let component: ValidateCodeComponent;
  let fixture: ComponentFixture<ValidateCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ValidateCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCodeComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
