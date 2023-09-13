import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationModel } from '@app/application.model';
import { ONBOARDING } from '@core/constants/auth';
import { Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-onboarding-container',
  templateUrl: './onboarding-container.component.html',
  styleUrls: ['./onboarding-container.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class OnBoardingContainer implements OnInit {
  public showButton: boolean = false;
  public showSlider: boolean = false;

  constructor(
    private model: ApplicationModel,
    private dom: ManipulateDomService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }

  public index(value: boolean): void {
    this.showButton = value;
  }

  public redirect(): void {
    this.model.showAnimate();
    setTimeout(() => {
      this.router.navigate([Navigate.home]);
      localStorage.setItem(ONBOARDING, btoa(JSON.stringify(true)));
    }, 500);
  }

  public slider(): void {
    this.showSlider = true;
  }
}
