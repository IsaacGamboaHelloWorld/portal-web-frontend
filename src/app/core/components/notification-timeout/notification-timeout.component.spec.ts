import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { NotificationTimeoutComponent } from './notification-timeout.component';

describe('NotificationTimeoutComponent', () => {
  let component: NotificationTimeoutComponent;
  let fixture: ComponentFixture<NotificationTimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationTimeoutComponent],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ModalService, ManipulateDomService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_closeNotification', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'close');
    (component as any)._closeNotification();
    expect(spy).toHaveBeenCalled();
  });

  it('closeModal', () => {
    const spy = spyOn(component as any, '_closeNotification');
    (component as any).closeModal();
    expect(spy).toHaveBeenCalled();
  });
});
