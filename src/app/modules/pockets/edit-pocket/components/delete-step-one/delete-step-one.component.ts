import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import {
  INavigatePockets,
  NavigatePockets,
} from '@app/modules/pockets/home-pockets/entities/routes';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { Observable, Subject } from 'rxjs';
import { EditPocketFacade } from '../../edit-pocket.facade';
import { IDeletePocket } from '../../store/reducers/delete-pocket.reducer';

@Component({
  selector: 'app-delete-step-one',
  templateUrl: './delete-step-one.component.html',
  styleUrls: ['./delete-step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteStepOneComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() formOne: FormGroup;
  public nameBank: string = '';
  public amount: string = '0';
  constructor(
    private modelHome: HomePocketsFacade,
    private router: Router,
    private modelEdit: EditPocketFacade,
  ) {}

  get activeProduct$(): Observable<IProductActive> {
    return this.modelHome.activeProduct$;
  }

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }

  get pocketDelete$(): Observable<IDeletePocket> {
    return this.modelEdit.deletePocket$;
  }

  ngOnInit(): void {
    if (this.formOne) {
      this.nameBank = this.formOne.value['name'];
      this.amount = this.formOne.value['amountSaved'];
    }
  }

  public download(): void {
    this.disabled = true;
    createJpeg('delete-pockect')
      .then((dataUrl) => {
        downloadImage('delete-pockect.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
  }

  public end(): void {
    this.modelEdit.clearEdit();
    this.router.navigate([Navigate.pockets]);
  }

  ngOnDestroy(): void {
    this.modelEdit.clearDelete();
    this.modelEdit.clearEdit();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
