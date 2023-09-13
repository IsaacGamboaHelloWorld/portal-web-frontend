import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { INavigateYourPlus, NavigateYourPlus } from './constants/routes';
import { StepLineTime } from './entities/your-plus.interface';
import { YourPlusService } from './services/your-plus.service';
import { YourPlusModel } from './store/models/your-plus.model';

@Component({
  selector: 'app-tu-plus',
  templateUrl: './tu-plus.component.html',
  styleUrls: ['./tu-plus.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TuPlusComponent implements OnInit, OnDestroy {
  public viewBack: boolean = false;
  public maxStep: number = 3;
  public backUrl: string;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _model: YourPlusModel,
    private _service: YourPlusService,
  ) {}

  ngOnInit(): void {
    this._router.navigate([this.navigate.step1]);
    this.validateSteps();
  }

  ngOnDestroy(): void {
    this._service
      .CloseSessionTuPlus()
      .pipe(take(1))
      .subscribe();
    this._model.reset();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get navigate(): INavigateYourPlus {
    return NavigateYourPlus;
  }
  get step$(): Observable<StepLineTime> {
    return this._model.step$;
  }

  public validateSteps(): void {
    this.step$.pipe(takeUntil(this._destroy$)).subscribe((response) => {
      this.selectStep(response.step);
    });
  }
  private selectStep(step: number): void {
    this.viewBack = true;
    switch (step) {
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
        this.backUrl = this.navigate.step1;
        break;
    }
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.home;
    } else {
      this.validateSteps();
    }
  }
}
