import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit, OnDestroy {
  private link: string =
    'https://www.bancopopular.com.co/BuscadordePuntosPopular/?entidad=popular';
  public visibleModal: boolean;
  public viewFull: boolean;
  public optionsContact: object[] = [];
  constructor(
    private dom: ManipulateDomService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.dom.removeClass('.headerTop', 'background-home');
    this.optionsContact = [
      ...this.optionsContact,
      {
        id: '1',
        contactName: `${this.translate.instant(
          'VIEW_CONTACT.CARD_ONE.LIGHT_TEXT1',
        )}${this.translate.instant('VIEW_CONTACT.CARD_ONE.TEXT1')}`,
        number: '0317434646',
        bold: true,
      },
      {
        id: '2',
        contactName: `${this.translate.instant('VIEW_CONTACT.CALL_TEXT')}`,
        number: '018000184646',
        bold: false,
      },
    ];
  }

  public redirect(): void {
    window.open(this.link, '_blank');
  }

  public openModal(): void {}
  public select(event?: object): void {
    this.visibleModal = false;
    if (event && matchMedia('(display-mode: standalone)').matches) {
      window.open(`tel:${event['number']}`, '_system');
    }
  }

  ngOnDestroy(): void {
    this.optionsContact = [];
    this.dom.addClass('.headerTop', 'background-home');
  }
}
