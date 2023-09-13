import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TypeCreditCardPipe } from '@core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { AdvanceFacadeMock } from '../../../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ToWhoComponent } from './to-who.component';

describe('ToWhoComponent', () => {
  let component: ToWhoComponent;
  let fixture: ComponentFixture<ToWhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ToWhoComponent, TypeCreditCardPipe],
      providers: [
        StepService,
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToWhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formSubmit();
    expect(component).toBeTruthy();
  });
});
