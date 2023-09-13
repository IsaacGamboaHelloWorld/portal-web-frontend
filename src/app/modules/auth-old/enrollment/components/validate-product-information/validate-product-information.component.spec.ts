import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthModelMock } from '../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ValidateProductInformationComponent } from './validate-product-information.component';

describe('ValidateProductInformationComponent', () => {
  let component: ValidateProductInformationComponent;
  let fixture: ComponentFixture<ValidateProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ValidateProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateProductInformationComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = {
      processId: '12343',
      secureDataBriefQuestion: {
        question: 'any*234',
        length: 5,
        accountType: 'SDA',
        questionType: 'text',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
