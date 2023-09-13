import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../core/components/alert-close/alert-close.component';
import { checkNested } from '../helpers/checkNested.helper';
import { SMALL_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';

@Component({
  selector: 'app-template-system',
  templateUrl: './template-system.container.html',
  styleUrls: ['./template-system.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateSystemContainer implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() backUrl: string;
  @Input() navigatorActive: boolean = false;
  @Input() sectionHome: boolean = false;
  @Input() stepsActive: boolean = false;
  @Input() sectionContent: TemplateRef<any>;
  @Input() testMode: boolean = false;
  @Input() fullContent: boolean = false;
  @Input() navInternal: boolean = false;
  @Input() showClose: boolean = false;
  @Input() step: number;
  @Input() lineSteps: string[];
  @Input() currentStep: number;
  @Input() backGreen: boolean = false;
  @Input() backGreenHeight: boolean = false;
  @Input() biller: boolean = false;
  @Input() maxStep: number;
  @Input() activeBackHistory: boolean = false;
  @Input() paramRoute1: any = null;
  @Input() paramRoute2: any = null;

  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _router: Router, private _modal: ModalService) {}

  ngOnInit(): void {}

  public back(): void {
    if (this.navigatorActive) {
      if (this.navInternal) {
        if (this.currentStep === 1 || this.maxStep === 1) {
          this._router.navigate([this.backUrl]);
        } else {
          if (this.biller) {
            this.currentStep = 2;
          }
          this.currentStep--;
          this.setStep.emit(this.currentStep);
        }
      } else {
        if (this.activeBackHistory) {
          window.history.back();
        } else if (this.backUrl) {
          const url: any[] = [this.backUrl];
          if (this.paramRoute1) {
            url.push(this.paramRoute1);
          }
          if (this.paramRoute2) {
            url.push(this.paramRoute2);
          }
          this._router.navigate(url);
        }
      }
    }
  }

  public openAlert(): void {
    this.eventModal.emit(true);
    this._modal.open(
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
        this._modal._dialogComponentRef,
      )
    ) {
      const component = this._modal._dialogComponentRef.instance.componentRef
        .instance;

      component.title = 'POCKETS.CANCEL_TEXT';
      component.img = '/cancelar_bolsillo.png';
      component.btnCancel = 'POCKETS.NEW.MODAL.NO';
      component.btnAgree = 'POCKETS.NEW.MODAL.YES';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._actionsButtons(false);
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._actionsButtons(true);
      });
    }
  }

  private _actionsButtons(isAgree: boolean): void {
    if (isAgree) {
      this._router.navigate([this.backUrl]);
      this._modal.close();
    } else {
      this.eventModal.emit(false);
      this._modal.close();
    }
  }
}
