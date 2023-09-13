import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-auth-ds',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  constructor(@Inject('isMobile') public isMobile: boolean) {}

  ngOnInit(): void {}

  get version(): string {
    return environment.version;
  }
}
