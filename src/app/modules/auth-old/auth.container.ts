import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';

const TIME = 8000;

@Component({
  selector: 'app-auth.container',
  templateUrl: './auth.container.html',
  styleUrls: ['./auth.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthContainer implements OnInit, OnDestroy {
  public slider: string[];
  public index: number = 0;
  private _subscription: Subscription;

  constructor(
    @Inject('isMobile') public isMobile: boolean,
    private translate: TranslateService,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.dom.addClass('html', 'show-recaptcha');
    this._sortSlider();
    this._initSlider();
  }

  ngOnDestroy(): void {
    if (!!this._subscription) {
      this._subscription.unsubscribe();
    }
    this.dom.removeClass('html', 'show-recaptcha');
  }

  get version(): string {
    return environment.version;
  }

  public setIndex(index: number): void {
    this.index = index;
    this._subscription.unsubscribe();
    this._initSlider();
  }

  private _initSlider(): void {
    if (!this.isMobile) {
      this._subscription = timer(TIME, TIME).subscribe(
        (data) => (this.index = (this.index + 1) % this.slider.length),
      );
    }
  }

  private _sortSlider(): void {
    const slider = this.translate.instant('AUTH.SLIDER');
    this.slider =
      typeof slider !== 'string' ? slider.sort(() => Math.random() - 0.5) : [];
  }
}
