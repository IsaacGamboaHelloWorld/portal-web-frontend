import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsLoadingComponent } from './ds-loading.component';

describe('DsLoadingComponent', () => {
  let component: DsLoadingComponent;
  let fixture: ComponentFixture<DsLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
