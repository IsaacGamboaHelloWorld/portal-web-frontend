import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { ModalDropdownComponent } from './modal-dropdown.component';

xdescribe('ModalDropdownComponent', () => {
  let component: ModalDropdownComponent;
  let fixture: ComponentFixture<ModalDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDropdownComponent],
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectOption', () => {
    const option = { ind: 1 };
    const ind = 1;
    component.selectOption(option, ind);

    component.actionAgree.subscribe((data: any) => {
      expect(data).toBe(option);
    });
  });

  it('emitCancel', () => {
    component.emitCancel();
    component.actionCancel.subscribe((data: any) => {
      expect(data).toBeUndefined();
    });
  });
});
