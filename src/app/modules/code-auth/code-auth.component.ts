import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepBar } from './entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from './entities/routes';
import { CodeAuthModel } from './store/model/code-auth.model';

@Component({
  selector: 'app-code-auth',
  templateUrl: './code-auth.component.html',
  styleUrls: ['./code-auth.component.sass'],
})
export class CodeAuthComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public viewBack: boolean = false;
  public textBtn: string = 'PAYMENTS.CLOSED.BTN';
  public step: number;
  public backUrl: string;
  public maxStep: number = 3;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private model: CodeAuthModel,
  ) {}

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }
  get step$(): Observable<StepBar> {
    return this.model.step$;
  }

  ngOnDestroy(): void {
    this.model.reset();
  }
  ngOnInit(): void {
    this.model.authGetSecuerDataSucces();
    this.model.authGetQuestionSucces();
    this.model.loadDebitCards();
    this.router.navigate([this.navigate.homeCodeAuth]);
    this.validateSteps();
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

  private _actionsModal(): void {
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
        this.modalService.close();
      });
    }
  }
  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.home;
    } else {
      this.validateSteps();
    }
  }
  public validateSteps(): void {
    this.step$.subscribe((response) => {
      this.viewBack = false;
      if (response.step >= 1) {
        this.viewBack = true;
      }
      switch (response.step) {
        case 1:
          this.backUrl = this.navigate.home;
          break;
        case 2:
          this.backUrl = this.navigate.step1;
          break;
        case 3:
          this.backUrl = this.navigate.step2;
          break;
        default:
          this.backUrl = this.navigate.home;
          break;
      }
      if (response.step === this.maxStep) {
        this.backUrl = this.navigate.homeCodeAuth;
      }
    });
  }
}
