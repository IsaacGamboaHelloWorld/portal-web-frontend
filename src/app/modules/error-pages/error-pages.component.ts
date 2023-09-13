import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
interface Dataerrors {
  ID: string;
  TEXT: string;
  TITLE: string;
}
@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.sass'],
})
export class ErrorPagesComponent implements OnInit {
  public errorId: string;
  public errors: object[] = [];
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.errorId = this.route.snapshot.paramMap.get('errorid');
    this.errors$.subscribe((data) => {
      if (typeof data === 'object') {
        data.forEach((e, i) => {
          this.errors = [
            ...this.errors,
            {
              ID: e['ID'],
              TEXT: e['TEXT'],
              TITLE: e['TITLE'],
            },
          ];
        });
      }
    });
  }
  getText(): string {
    if (this.errors.length) {
      return this.errors.find((key) => key['ID'] === this.errorId)['TEXT'];
    }
  }
  getTitle(): string {
    if (this.errors.length) {
      return this.errors.find((key) => key['ID'] === this.errorId)['TITLE'];
    }
  }
  get errors$(): Observable<Dataerrors[]> {
    return this.translate.get('ERROR_PAGES.ERRORS');
  }
  get navigate(): INavigate {
    return Navigate;
  }
}
