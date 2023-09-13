import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../../core/components/alert-close/alert-close.component';
import { Navigate } from '../../../core/constants/navigate';
import { checkNested } from '../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../shared/modal/services/modal.service';
import {
  INavigatePockets,
  NavigatePockets,
} from '../home-pockets/entities/routes';

@Component({
  selector: 'app-move-pockets',
  templateUrl: './move-pockets.container.html',
  styleUrls: ['./move-pockets.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MovePocketsContainer implements OnInit {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public backUrl: string = Navigate.pockets;
  public step: number = 0;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((data) => {
        if (
          String(data.url).split('?')[0] === this.navigate.success_move_money
        ) {
          this.step = 1;
        }
      });
  }

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }
  public back(): void {
    this.router.navigate([Navigate.pockets]);
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = Navigate.pockets;
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
        this.modalService.close();
      });
    }
  }
}
