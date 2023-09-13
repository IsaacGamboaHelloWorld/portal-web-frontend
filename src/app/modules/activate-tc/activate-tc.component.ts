import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INavigateActivateTc, NavigateActivateTc } from './entities/routes';
import { ActivateTcModel } from './store/model/activate-tc.model';

@Component({
  selector: 'app-activate-tc',
  templateUrl: './activate-tc.component.html',
  styleUrls: ['./activate-tc.component.sass'],
})
export class ActivateTcComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private model: ActivateTcModel,
  ) {}

  get navigate(): INavigateActivateTc {
    return NavigateActivateTc;
  }

  ngOnInit(): void {
    this.router.navigate([this.navigate.step1]);
  }

  openAlert(): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  public _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.title = 'WITHDRAWAL.CANCEL_STEP.DESC';
      component.img = '/salir.png';
      component.btnCancel = 'WITHDRAWAL.CANCEL_STEP.NO_OPT';
      component.btnAgree = 'WITHDRAWAL.CANCEL_STEP.YES_OPT';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.model.reset();
        this.router.navigate([this.navigate.home]);
      });
    }
  }

  ngOnDestroy(): void {
    this.model.reset();
  }
}
