import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { AdvanceFacadeMock } from '../../../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { AdvanceSuccessComponent } from './advance-success.component';

describe('AdvanceSuccessComponent', () => {
  let component: AdvanceSuccessComponent;
  let fixture: ComponentFixture<AdvanceSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AdvanceSuccessComponent, RemoveValuePipe],
      providers: [
        StepService,
        ManipulateDomService,
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.redirect();
    expect(component).toBeTruthy();
  });
});
