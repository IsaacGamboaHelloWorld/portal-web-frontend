import { Component, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '@core/constants/navigate';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent {
  constructor() {}

  get navigate(): INavigate {
    return Navigate;
  }
}
