import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { UserData } from '@app/core/models/user/userData';
import { STEPS } from '@app/modules/auth/constants/steps';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalAlertsComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public img: string = '/tarjeta-credito@3x.png';
  public loading: boolean = false;
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.model.enrollmentData$;
  public processId: any = '';
  constructor(
    protected model: AuthModel,
    private modalService: ModalService,
    private router: Router,
  ) {
    super(model);
  }

  ngOnInit(): void {}
  protected _initForm(): void {}
  public emitClick(): void {
    this.enrollmentData$.pipe(take(1)).subscribe((enroll: any) => {
      if (enroll && enroll.data['processId']) {
        this.processId = enroll.data['processId'];
        const experianData: any = {
          ...enroll.data['experian'],
        };
        const request: DataUser = {
          processId: enroll.data['processId'],
          content: {
            experian: experianData,
            userConfirmErrorExperianStep:
              enroll.data['step'] === STEPS.USER_CONFIRM_FROM_EXPERIAN_ERROR,
            userConfirmErrorPinStep:
              enroll.data['step'] === STEPS.USER_CONFIRM_FROM_PIN_ERROR,
          },
        };
        this.model.fetchUser(request);
        this.modalService.close();
      }
    });
  }
}
