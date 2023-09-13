import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../../core/components/alert-close/alert-close.component';
import { INavigate, Navigate } from '../../../core/constants/navigate';
import { checkNested } from '../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { NewPocketFacade } from './new-pocket.facade';

@Component({
  selector: 'app-new-pocket',
  templateUrl: './new-pocket.container.html',
  styleUrls: ['./new-pocket.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NewPocketContainer implements OnInit, OnDestroy {
  @Input() step: number;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public editMode: boolean = false;

  constructor(
    private translate: TranslateService,
    private modalService: ModalService,
    private router: Router,
    private facade: NewPocketFacade,
  ) {}

  ngOnInit(): void {
    this.step = 1;
  }

  ngOnDestroy(): void {
    this.facade.resetPocket();
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public setStep(_number: number): void {
    this.step = _number;
  }

  public back(): void {
    if (this.step === 1) {
      this.router.navigate([Navigate.pockets]);
    } else {
      this.step--;
    }
  }

  public openAlert(): void {
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

      component.title = 'POCKETS.CANCEL_TEXT';
      component.img = '/cancelar_bolsillo.png';
      component.btnCancel = 'POCKETS.NEW.MODAL.NO';
      component.btnAgree = 'POCKETS.NEW.MODAL.YES';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.router.navigate([Navigate.pockets]);
        this.facade.resetPocket();
        this.modalService.close();
      });
    }
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get items$(): Observable<string[]> {
    return this.translate.get('LINE_TIME_POCKETS');
  }
}
