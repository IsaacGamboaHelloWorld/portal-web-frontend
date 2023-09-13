import { Component, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '@core/constants/navigate';

@Component({
  selector: 'app-ie-version',
  templateUrl: './ie-version.component.html',
  styleUrls: ['./ie-version.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class IeVersionComponent {
  constructor() {}

  get navigate(): INavigate {
    return Navigate;
  }
}
