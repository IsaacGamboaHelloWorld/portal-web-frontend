import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../../core/components/alert-close/alert-close.component';
import { INavigate, Navigate } from '../../../core/constants/navigate';
import { checkNested } from '../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../shared/modal/services/modal.service';

@Component({
  selector: 'app-edit-pocket',
  templateUrl: './edit-pocket.container.html',
  styleUrls: ['./edit-pocket.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditPocketContainer implements OnInit {
  public step: string = 'EDIT';
  public formStepEdit: FormGroup;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {}

  public back(): void {
    this.router.navigate([Navigate.pockets]);
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
        this.modalService.close();
      });
    }
  }

  public stepEvent(event: string): void {
    this.step = event;
  }

  public formStepEvent(event: FormGroup): void {
    this.formStepEdit = event;
  }

  get navigate(): INavigate {
    return Navigate;
  }
}
