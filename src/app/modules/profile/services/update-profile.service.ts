import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerProfile } from '@app/core/models/user/user-profile';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UpdateProfileResponse } from '../entities/update-profile-response';

@Injectable()
export class UpdateProfileService {
  constructor(private http: HttpClient) {}

  public updateProfile(
    updateRequest: CustomerProfile,
  ): Observable<UpdateProfileResponse> {
    return this.http.post<UpdateProfileResponse>(
      environment.api.base + environment.api.services.customer.updateProfile,
      updateRequest,
    );
  }
}
