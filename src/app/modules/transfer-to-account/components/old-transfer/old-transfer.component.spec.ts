import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTransferComponent } from './old-transfer.component';

xdescribe('OldTransferComponent', () => {
  let component: OldTransferComponent;
  let fixture: ComponentFixture<OldTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OldTransferComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
