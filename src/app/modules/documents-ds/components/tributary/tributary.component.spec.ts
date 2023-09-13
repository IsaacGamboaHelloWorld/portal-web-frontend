import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TributaryComponent } from './tributary.component';

describe('TributaryComponent', () => {
  let component: TributaryComponent;
  let fixture: ComponentFixture<TributaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TributaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TributaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
