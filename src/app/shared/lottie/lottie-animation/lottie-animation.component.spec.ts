import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAnimationComponent } from 'app/shared/lottie/lottie-animation/lottie-animation.component';

describe('LottieAnimationComponent', () => {
  let component: LottieAnimationComponent;
  let fixture: ComponentFixture<LottieAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LottieAnimationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottieAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
