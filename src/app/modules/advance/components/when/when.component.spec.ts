import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { AdvanceFacadeMock } from '../../../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { WhenComponent } from './when.component';

describe('WhenComponent', () => {
  let component: WhenComponent;
  let fixture: ComponentFixture<WhenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [WhenComponent, RemoveValuePipe],
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
    fixture = TestBed.createComponent(WhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formSubmit();
    component.selectedOption(null);
    expect(component).toBeTruthy();
  });
});
