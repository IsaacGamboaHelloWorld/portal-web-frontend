import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketComponent {
  @Input() listTemplate: TemplateRef<any>;
  @Input() messageTitle: string = '';
  @Input() imageTicket: string = '';
  @Input() description: string = '';
  @Input() messageText: string = '';
  @Input() pseVersion: boolean = false;
  @Input() btnText: string = null;
  @Input() btnLoadingText: string = '';
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() showIp: boolean = true;
  @Input() id: string = 'voucher' + this.messageText;
  @Input() response: GenericResponse;
  @Input() note: string = '';
  @Input() classSucces: boolean = false;
  @Output() btnAction: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get showBtn(): boolean {
    return !isNullOrUndefined(this.btnText);
  }

  get date(): Date {
    if (!!this.response && !!this.response.dateTime) {
      return new Date(this.response.dateTime);
    }
    return new Date();
  }

  get ip(): string {
    if (!!this.response && !!this.response.request) {
      return this.response.request.ipAddress;
    }
    return null;
  }
}
