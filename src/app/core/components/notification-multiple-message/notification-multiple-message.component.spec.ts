import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApplicationModel } from '@app/application.model';
import { ApplicationModelMock } from '../../../../../test-helpers/mocks/models/application.model.mock';
import { NotificationMMComponent } from './notification-multiple-message.component';

describe('NotificationMMComponent', () => {
  let component: NotificationMMComponent;
  let fixture: ComponentFixture<NotificationMMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationMMComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMMComponent);
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

    component.notificationClosed();
  });
});
