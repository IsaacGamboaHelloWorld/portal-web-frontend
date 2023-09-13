import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StepLineTime } from './entities/alerts';
import { AlertsModel } from './store/model/alerts.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent implements OnInit {
  public title: string = '';
  public subtitle: string = '';
  public numberSteps: number = 4;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 3;
  public backUrl: string;
  constructor(private router: Router, private _model: AlertsModel) {}

  get navigate(): INavigate {
    return Navigate;
  }

  get step$(): Observable<StepLineTime> {
    return this._model.step$;
  }

  ngOnInit(): void {
    this.router.navigate([this.navigate.alerts + '/onboarding']);
    this.validateSteps();
    this.setTitle(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((data) => {
        this.setTitle(data.url);
      });
  }

  public setTitle(url: string): void {
    this.subtitle = '';
    switch (url) {
      case this.navigate.alerts:
        this.title = '';
        break;
      case this.navigate.alerts_create:
        this.title = 'Nueva alerta o notificación';
        this.subtitle = 'Elige el producto que deseas monitorear.';
        break;
      case this.navigate.alerts_home:
        this.title = 'Mis alertas y notificaciones';
        break;
      default:
        this.title = '';
        break;
    }
  }

  public validateSteps(): void {
    this.step$.subscribe((response) => {
      this.viewBack = false;
      if (response.step >= 1) {
        this.viewBack = true;
      }
      switch (response.step) {
        case 1:
          this.backUrl = this.navigate.security;
          break;
        case 2:
          this.backUrl = this.navigate.alerts;
          break;
        case 3:
          this.backUrl = this.navigate.home;
          break;
        default:
          this.backUrl = this.navigate.security;
          break;
      }
      if (response.step === this.maxStep) {
        this.backUrl = this.navigate.security;
      }
    });
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.security;
    } else {
      this.validateSteps();
    }
  }
}
