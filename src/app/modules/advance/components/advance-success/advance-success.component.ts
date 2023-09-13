import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { advanceRootRoute } from '@modules/advance/constants/routes';
import { StepService } from '@modules/advance/services/step.service';
import { ITransferAdvance } from '@modules/advance/store/reducers/transfer-advance.reducer';
import { IFormGlobal } from '../../entities/form-global';

@Component({
  selector: 'app-advance-success',
  templateUrl: './advance-success.component.html',
  styleUrls: ['./advance-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvanceSuccessComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  public cost: number = 0;
  constructor(
    private facade: AdvanceFacade,
    private stepService: StepService,
    private router: Router,
    private dom: ManipulateDomService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }

  get advanceTransfer$(): Observable<ITransferAdvance> {
    return this.facade.transferAdvance$;
  }

  get formGlobal$(): Observable<IFormGlobal> {
    return this.facade.formGlobal$;
  }

  ngOnDestroy(): void {
    this.facade.advanceReset();
    this.facade.setFormReset();
    this.stepService.setStep(1);
  }

  public redirect(): void {
    this.router.navigate([`/${advanceRootRoute}`]);
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-advance')
      .then((dataUrl) => {
        downloadImage('voucher-avance.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }
}
