import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS_WITH_LOADER } from '@app/core/components/loader/utils/loader-show-urls';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../loader.component';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  public requests: Array<HttpRequest<any>> = [];
  public count: number = 0;

  constructor(
    private loaderService: LoaderService,
    private modalService: ModalService,
  ) {}

  public removeRequest(req?: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    URLS_WITH_LOADER.forEach((e) => {
      if (this._findValue(req.url, e)) {
        this.showLoader();
      }
    });
    return Observable.create((observer) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        },
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
  public _findValue(url: string, urls_encrypt: string): boolean {
    return url.endsWith(urls_encrypt);
  }

  public showLoader(): void {
    this.count++;
    if (this.count === 1) {
      this.modalService.open(
        LoaderComponent,
        true,
        `${SMALL_WIDTH} not-button-close`,
      );
      setTimeout(() => {
        this.count = 0;
      }, 3000);
    }
  }
}
