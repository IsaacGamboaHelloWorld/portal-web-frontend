import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CURRENT_USER } from '@app/core/constants/auth';
import {
  URL_CDT_UTM,
  URL_CREDIT_CARD,
  URL_OFFERS_UTM,
} from '@app/core/constants/global';
import { SecurityService } from '@app/modules/security/services/security.service';
import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import * as Events from '@core/constants/events';
import { environment } from '@environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private urlEncode: HttpUrlEncodingCodec,
    private securityService: SecurityService,
  ) {}

  get optionsOffers$(): Observable<object[]> {
    return this.translateService
      .get('HOME.OFFER_PRODUCTS.OFFER_PRODUCTS_CONTENT')
      .pipe(
        map((items) =>
          items.filter((item: object) => item['ACTIVE'] === 'TRUE'),
        ),
      );
  }

  ngOnInit(): void {}

  public open(event: object): void {
    const setObj: object = Events.obj_layer(Events.EventLabel.saving_account);
    const objEvent: object = {
      eventCategory: setObj['eventCategory'],
      eventAction: setObj['eventAction'],
      eventLabel: setObj['eventLabel'],
    };
    eventDataLayer(objEvent, setObj['eventCategory']);
    const tokenPB = this.urlEncode.encodeValue(
      this.securityService.getItem(CURRENT_USER),
    );
    let url = '';
    switch (event['ID']) {
      case '1':
        url = `${environment.url_redirect}${tokenPB}${URL_OFFERS_UTM}`;
        window.open(url, '_blank');
        break;
      case '2':
        url = `${environment.url_redirect_credit}${tokenPB}${URL_CREDIT_CARD}`;
        window.open(url, '_blank');
        break;
      case '3':
        url = `${environment.url_redirect_cdt}${URL_CDT_UTM}`;
        const openWindow: any = window.open(url, '_blank');
        const obj = { token: tokenPB };
        setTimeout(() => {
          if (openWindow) {
            openWindow.postMessage(obj, url);
          }
        }, 5000);
        break;
    }
  }
}
