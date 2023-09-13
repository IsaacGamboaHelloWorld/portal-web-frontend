import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTransferComponent } from './fast-transfer.component';

xdescribe('FastTransferComponent', () => {
  let component: FastTransferComponent;
  let fixture: ComponentFixture<FastTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FastTransferComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
