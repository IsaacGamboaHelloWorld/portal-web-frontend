import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { SliderOnBoardingComponent } from './slider-on-boarding.component';

describe('SliderOnBoardingComponent', () => {
  let component: SliderOnBoardingComponent;
  let fixture: ComponentFixture<SliderOnBoardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SliderOnBoardingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderOnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.clickRedirect();
    expect(component).toBeTruthy();
  });

  it('should be click bet next slider', () => {
    component.ngAfterViewInit();
    const button = fixture.debugElement.nativeElement.querySelector(
      `.tns-controls button`,
    );
    button.click();
    component.showBtn.emit(true);
  });
});
