import { HttpUrlEncodingCodec } from '@angular/common/http';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CURRENT_USER } from '@app/core/constants/auth';
import {
  BTN_CREDIT_CARD,
  BTN_OFFERS,
  URL_CREDIT_CARD,
  URL_OFFERS_UTM,
} from '@app/core/constants/global';
import { SecurityService } from '@app/modules/security/services/security.service';
import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import * as Events from '@core/constants/events';
import { environment } from '@environment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-offer',
  templateUrl: './product-offer.component.html',
  styleUrls: ['./product-offer.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [HttpUrlEncodingCodec],
})
export class ProductOfferComponent implements OnInit {
  @Input() offer: {
    img: string;
    name: string;
    title: string;
    desc: string;
    btn: string;
  };

  constructor(
    private urlEncode: HttpUrlEncodingCodec,
    private securityService: SecurityService,
  ) {}
  get hasOffer(): boolean {
    return !isNullOrUndefined(this.offer);
  }

  ngOnInit(): void {
    this.setImageResponsive(window.innerWidth);
  }

  public rediRet(event?: object, idBox?: string): void {
    let url = '';
    switch (idBox) {
      case BTN_OFFERS:
        const setObj: object = Events.obj_layer(
          Events.EventLabel.saving_account,
        );
        const objEvent: object = {
          eventCategory: setObj['eventCategory'],
          eventAction: setObj['eventAction'],
          eventLabel: setObj['eventLabel'],
        };
        eventDataLayer(objEvent, setObj['eventCategory']);
        const token = this.urlEncode.encodeValue(
          this.securityService.getItem(CURRENT_USER),
        );
        url = `${environment.url_redirect}${token}${URL_OFFERS_UTM}`;
        break;
      case BTN_CREDIT_CARD:
        url = `${environment.url_redirect_credit}${URL_CREDIT_CARD}`;
        break;
    }
    window.open(url, '_blank');
  }

  @HostListener('window:resize') getScreenSize(): void {
    this.setImageResponsive(window.innerWidth);
  }

  public setImageResponsive(width: number): void {
    if (typeof this.offer === 'object') {
      if (width >= 1024) {
        this.offer['img'] = this.setNameImage(this.offer['img']);
      } else if (width >= 768) {
        this.offer['img'] = this.setNameImage(this.offer['img']);
      } else if (width > 576) {
        this.offer['img'] = this.setNameImage(this.offer['img']);
      } else if (width === 576) {
        this.offer['img'] = this.setNameImage(this.offer['img']);
      } else if (width <= 575) {
        this.offer['img'] = this.setNameImage(this.offer['img']);
      }
    }
  }

  public setNameImage(name: string): string {
    if (name.search('desktop') >= 0) {
      const desktop = name.split('desktop');
      return `${desktop[0]}desktop${desktop[1]}`;
    } else if (name.search('large') >= 0) {
      const large = name.split('large');
      return `${large[0]}large${large[1]}`;
    } else if (name.search('medium') >= 0) {
      const medium = name.split('medium');
      return `${medium[0]}medium${medium[1]}`;
    } else if (name.search('small') >= 0) {
      const small = name.split('small');
      return `${small[0]}small${small[1]}`;
    }
  }
}
