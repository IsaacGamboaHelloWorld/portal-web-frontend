import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IPublicService } from '../../../../modules/paymentsv2/public-services/entities/public-services';

@Component({
  selector: 'app-programmed-payment',
  templateUrl: './programmed-payment.component.html',
  styleUrls: ['./programmed-payment.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProgrammedPaymentComponent implements OnInit {
  @Input() data: IPublicService;
  @Input() actived: boolean = false;
  @Input() showInEnd: boolean = false;
  @Input() disabled: boolean = false;
  @Output() stateCheck: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  public changeStatus(data: boolean): void {
    this.actived = !this.actived;
    setTimeout(() => (this.actived = !this.actived), 10);
    this.stateCheck.emit(data);
  }

  public edit(): void {
    if (!!this.data) {
      const dataToEdit = {
        action: 'EDIT',
        data: this.data,
      };
      this.editAction.emit(dataToEdit);
    }
  }
}
