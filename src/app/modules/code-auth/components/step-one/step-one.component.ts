import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAnswerAllowedCodeAuth } from '../../entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from '../../entities/routes';
import { CodeAuthModel } from '../../store/model/code-auth.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit, OnDestroy {
  public titleStep: string = 'CODE_AUTH.ONBOARDING.TITLE';
  public textStep: string;
  public imgStep: string = '/secure-payment.png';
  public count: number = 0;
  public userAlreadyHasHard: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public subscribe: Subscription = new Subscription();
  public stepCheck: HTMLCollection;
  @ViewChild('step', null) step: ElementRef;
  public listPoints: object[] = [];

  constructor(
    private render: Renderer2,
    private router: Router,
    private model: CodeAuthModel,
    private modalService: ModalService,
    private translate: TranslateService,
  ) {}

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }

  get stateActivate(): Observable<IAnswerAllowedCodeAuth> {
    return this.model.stateAllowedCodeAuth$;
  }

  ngOnInit(): void {
    this.stateActivate.pipe(takeUntil(this._destroy$)).subscribe((data) => {
      this.listPoints = [];
      this.listPoints = [
        ...this.listPoints,
        { id: '1', checked: true, value: 0, hard: false, virtual: false },
        { id: '2', checked: false, value: 1, hard: false, virtual: false },
        { id: '3', checked: false, value: 2, hard: false, virtual: false },
        { id: '4', checked: false, value: 3, hard: false, virtual: false },
      ];
      if (data.success && !data.userAlreadyHasHard) {
        this.listPoints.splice(3, 1);
      }
      setTimeout(() => {
        this.modalService.close();
        this.stepCheck = document.getElementsByClassName('page-point');
        if (this.stepCheck.length) {
          this.stepCheck.item(this.count)['checked'] = true;
        }
      }, 1000);
    });
    this.textStep = this.boldText(
      'CODE_AUTH.ONBOARDING.STEP1',
      'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP1',
    );
    this._setStep(2);
    this.model.creationAllowedSucces();
  }

  public toggle(event: string): void {
    this.render.removeClass(this.step.nativeElement, 'fade-in-right');
    this.render.removeClass(this.step.nativeElement, 'fade-in-left');
    switch (event) {
      case 'prev':
        this.count--;
        this.render.addClass(this.step.nativeElement, 'fade-in-left');
        break;
      case 'next':
        this.count++;
        this.render.addClass(this.step.nativeElement, 'fade-in-right');
        break;
    }
    this.count =
      this.count < 0
        ? 0
        : this.count >= this.stepCheck.length
        ? this.stepCheck.length - 1
        : this.count;
    this.stepCheck.item(this.count)['checked'] = true;
    this.stateActivate.pipe(takeUntil(this._destroy$)).subscribe((data) => {
      if (data) {
        this.userAlreadyHasHard = data.userAlreadyHasHard;
        switch (this.stepCheck.item(this.count)['value']) {
          case '0':
            this.titleStep = 'CODE_AUTH.ONBOARDING.TITLE';
            this.textStep = this.boldText(
              'CODE_AUTH.ONBOARDING.STEP1',
              'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP1',
            );
            this.imgStep = '/secure-payment.png';
            break;
          case '1':
            this.imgStep = '/icon-celular@3x.png';
            this.titleStep = 'CODE_AUTH.ONBOARDING.TITLE_STEP2';
            this.textStep = this.boldText(
              'CODE_AUTH.ONBOARDING.STEP2',
              'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP2',
            );
            break;
          case '2':
            if (data.userAlreadyHasHard && this.stepCheck.length === 3) {
              this.imgStep = '/token.png';
              this.titleStep = 'CODE_AUTH.ONBOARDING.TITLE_STEP4';
              this.textStep = this.boldText(
                'CODE_AUTH.ONBOARDING.STEP4',
                'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP4',
              );
            } else {
              this.imgStep = '/phone@3x.png';
              this.titleStep = 'CODE_AUTH.ONBOARDING.TITLE_STEP3';
              this.textStep = this.boldText(
                'CODE_AUTH.ONBOARDING.STEP3',
                'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP3',
              );
            }
            break;
          case '3':
            this.imgStep = '/token.png';
            this.titleStep = 'CODE_AUTH.ONBOARDING.TITLE_STEP4';
            this.textStep = this.boldText(
              'CODE_AUTH.ONBOARDING.STEP4',
              'CODE_AUTH.ONBOARDING.BOLD_TEXT_STEP4',
            );
            break;
          default:
            this.count = 0;
            break;
        }
      }
    });
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public submitData(): void {
    if (this.userAlreadyHasHard) {
      this.modalService.open(
        AlertCloseComponent,
        true,
        `${SMALL_WIDTH} not-button-close`,
      );
      setTimeout(() => {
        this._actionsModal();
      }, 10);
    } else {
      this.router.navigate([this.navigate.step2]);
    }
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
      component.title = 'CODE_AUTH.MODAL_ALERT.TITLE';
      component.desc = 'CODE_AUTH.MODAL_ALERT.TEXT';
      component.btnAgree = 'CODE_AUTH.MODAL_ALERT.BTN';
      component.btnCancel = 'CODE_AUTH.MODAL_ALERT.CANCEL';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.router.navigate([this.navigate.step2]);
        this.modalService.close();
      });
    }
  }

  public boldText(text: string, bold: string): string {
    const textStep = this.translate.instant(text);
    const boldStep = this.translate.instant(bold);
    return textStep.indexOf('><') > 0
      ? `${textStep.split('><')[0]}>${boldStep}<${textStep.split('><')[1]}`
      : textStep;
  }

  ngOnDestroy(): void {
    this.stepCheck = null;
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
