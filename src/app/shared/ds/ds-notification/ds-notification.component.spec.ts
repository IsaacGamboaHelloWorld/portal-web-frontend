import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';

import { DsNotificationComponent } from './ds-notification.component';

describe('DsNotificationComponent', () => {
  let component: DsNotificationComponent;
  let fixture: ComponentFixture<DsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DsNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
