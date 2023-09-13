import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ApplicationModel } from '@app/application.model';
import { ApplicationModelMock } from '../../../../../test-helpers/mocks/models/application.model.mock';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should view params in HTML', () => {
    expect(
      fixture.debugElement.query(By.css('.notification-global')).nativeElement
        .classList,
    ).toContain('open');

    expect(
      fixture.debugElement.query(By.css('.notification-global')).nativeElement
        .classList,
    ).toContain('error');

    expect(
      fixture.debugElement.query(By.css('.notification-global p')).nativeElement
        .textContent,
    ).toContain('Hello');
    component.notificationClosed();
  });
});
