import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { NotificationTypeSms } from '../constants/notification-type-sms.enum';

@Injectable()
export class NotificationSmsService {
  constructor(private http: HttpClient) {}

  public sendNotificationSms(): Observable<any> {
    const data = {
      notificationType: NotificationTypeSms.CHANGE_PASSWORD,
    };
    return this.http.post<any>(
      environment.api.base + environment.api.services.notificationSms,
      data,
    );
  }
}
