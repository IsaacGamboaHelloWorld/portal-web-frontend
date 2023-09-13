import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

import { isIOS } from '@app/shared/helpers/isMobile';
import { Events } from '@core/constants/events';
import { EventsService } from '@core/services/tag_manager/events.service';

@Injectable()
export class PwaService {
  private promptEvent: any;

  constructor(private tangManager: EventsService) {
    window.addEventListener('beforeinstallprompt', (event) => {
      // TODO: Funcionalidad para PWA que se va a habilitar cuando Chrome sea compatible,
      // por ahora solo funciona para Chrome dev versiones mayores a 90
      // https://avaldigitallabs.atlassian.net/browse/PBPOP-3356
      if (!environment.screenShotPWA) {
        event.preventDefault();
        this.promptEvent = event;
      }
    });
  }

  get promptEv(): any {
    return this.promptEvent;
  }

  public pwaSettings(): void {
    this._trackEventOpenPWA();
    this._pwaUpdate();
  }

  public installPwa(): void {
    if (!!this.promptEvent) {
      this.promptEvent.prompt();
    }
  }

  public eventInstallPwa(): void {
    window.addEventListener('appinstalled', (event) => {
      this.tangManager.event({
        eventCategory: Events.pwa,
      });
    });
  }

  private _pwaUpdate(): void {
    if (isIOS() && window.navigator['standalone'] === true) {
      this._registerPageVisibility();
    }
  }

  private _trackEventOpenPWA(): void {
    if (matchMedia('(display-mode: standalone)').matches) {
      this.tangManager.event({
        eventCategory: Events.open_app,
      });
    }
  }

  private _registerPageVisibility(): void {
    let hidden;
    let visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document['msHidden'] !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document['webkitHidden'] !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }
    window.document.addEventListener(visibilityChange, () => {
      if (!document[hidden]) {
        window.location.reload();
      }
    });
  }
}
