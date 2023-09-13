import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { EventsService } from './../../../../core/services/tag_manager/events.service';
import { EvidenteQuestionnaireComponent } from './evidente-questionnaire.component';

describe('EvidenteQuestionnaireComponent', () => {
  let component: EvidenteQuestionnaireComponent;
  let fixture: ComponentFixture<EvidenteQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      declarations: [EvidenteQuestionnaireComponent],
      providers: [EventsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenteQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
