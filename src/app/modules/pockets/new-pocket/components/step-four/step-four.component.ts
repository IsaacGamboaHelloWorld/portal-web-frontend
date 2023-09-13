import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import {
  IAnswerPocket,
  IPocketFormOne,
} from '@app/modules/pockets/move-pockets/entities/move-pockets';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { Observable } from 'rxjs';
import { IPocketFormThree, IPocketFormTwo } from '../../entities/new-pockets';
import { NewPocketFacade } from './../../new-pocket.facade';

@Component({
  selector: 'app-step-four-pocket',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepFourComponent implements OnInit {
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  public dataAccount: object = {};
  public disabled: boolean = false;
  constructor(private facade: NewPocketFacade, private router: Router) {}

  get activeProduct$(): Observable<IProductActive> {
    return this.facade.activeProduct$;
  }

  get firstStep$(): Observable<IPocketFormOne> {
    return this.facade.firstStep$;
  }

  get twoStep$(): Observable<IPocketFormTwo> {
    return this.facade.stepTwo$;
  }

  get stepThree$(): Observable<IPocketFormThree> {
    return this.facade.stepThree$;
  }

  get pocketAnswer$(): Observable<IAnswerPocket> {
    return this.facade.pocketAnswer$;
  }

  ngOnInit(): void {}

  public download(): void {
    this.disabled = true;
    createJpeg('new-pocket')
      .then((dataUrl) => {
        downloadImage('new-pocket.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
  }

  public end(): void {
    this.setStep.emit(1);
    this.facade.resetPocket();
    this.router.navigate([Navigate.pockets]);
  }
}
