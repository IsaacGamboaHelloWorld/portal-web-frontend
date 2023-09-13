import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../../../../core/components/alert-close/alert-close.component';
import { checkNested } from '../../../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../../../shared/modal/services/modal.service';
import { INavigatePockets, NavigatePockets } from '../../entities/routes';

@Component({
  selector: 'app-new-pocket',
  templateUrl: './new-pocket.component.html',
  styleUrls: ['./new-pocket.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPocketComponent {
  @Input() pocketsAmount: number = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _modalService: ModalService, private _router: Router) {}

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }

  public newPocket(): void {
    if (this.pocketsAmount >= 5) {
      this._modalService.open(
        AlertCloseComponent,
        true,
        `${SMALL_WIDTH} not-button-close only-accept`,
      );
      setTimeout(() => {
        this._actionsModal();
      }, 10);
    } else {
      this._router.navigate([this.navigate.new_pocket]);
    }
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.title = 'POCKETS.NEW.AMOUNT_POPUP.TITLE';
      component.desc = 'POCKETS.NEW.AMOUNT_POPUP.DESC';
      component.btnAgree = 'POCKETS.NEW.AMOUNT_POPUP.BTN';

      component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this._modalService.close();
      });
    }
  }
}
