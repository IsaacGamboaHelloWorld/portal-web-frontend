import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AuthModelMock } from '../../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { AuthModel } from '../../../../store/model/auth.model';
import { AcceptChannelPoliciesComponent } from './accept-channel-policies.component';

describe('AcceptChannelPoliciesComponent', () => {
  let component: AcceptChannelPoliciesComponent;
  let fixture: ComponentFixture<AcceptChannelPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AcceptChannelPoliciesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptChannelPoliciesComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
