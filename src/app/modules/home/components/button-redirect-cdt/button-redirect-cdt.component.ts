import { HttpUrlEncodingCodec } from '@angular/common/http';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CURRENT_USER } from '@app/core/constants/auth';
import { BTN_CDT, URL_CDT_UTM } from '@app/core/constants/global';
import { SecurityService } from '@app/modules/security/services/security.service';
import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import * as Events from '@core/constants/events';
import { environment } from '@environment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-button-redirect-cdt',
  templateUrl: './button-redirect-cdt.component.html',
  styleUrls: ['./button-redirect-cdt.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [HttpUrlEncodingCodec],
})
export class ButtonRedirectCdtComponent implements OnInit {
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
    if (this.offer['name'] === BTN_CDT) {
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
      const url = `${environment.url_redirect_cdt}${URL_CDT_UTM}`;
      const openWindow: any = window.open(url, '_blank');
      const obj = { token: tokenPB };
      setTimeout(() => {
        if (openWindow) {
          openWindow.postMessage(obj, url);
        }
      }, 5000);
    }
  }

  @HostListener('window:resize') getScreenSize(): void {
    this.setImageResponsive(window.innerWidth);
  }

  public setImageResponsive(width: number): void {
    if (typeof this.offer === 'object') {
      if (width >= 1024) {
        this.offer['img'] = '/open-cdt-desktop.png';
      } else if (width >= 768) {
        this.offer['img'] = '/open-cdt-large.png';
      } else if (width > 576) {
        this.offer['img'] = '/open-cdt-desktop.png';
      } else if (width === 576) {
        this.offer['img'] = '/open-cdt-medium.png';
      } else if (width <= 575) {
        this.offer['img'] = '/open-cdt-small.png';
      }
    }
  }
}
