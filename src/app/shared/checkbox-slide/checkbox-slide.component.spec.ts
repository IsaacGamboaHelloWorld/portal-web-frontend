import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxSlideComponent } from './checkbox-slide.component';

describe('CheckboxSlideComponent', () => {
  let component: CheckboxSlideComponent;
  let fixture: ComponentFixture<CheckboxSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxSlideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.form = undefined;
    component.toggleCheck();
    expect(component).toBeTruthy();
  });

  it('should be change value boolean', () => {
    component.form = new FormGroup({
      remember: new FormControl(false),
    });
    component.property = 'remember';
    component.toggleCheck();

    expect(
      fixture.debugElement.query(By.css('.checkbox-slide-new')).nativeElement
        .classList,
    ).not.toContain('active');

    expect(component.check).toBeTruthy();
  });
});
