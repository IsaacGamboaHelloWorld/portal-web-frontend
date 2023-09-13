import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-loan-to-admin',
  templateUrl: './loan-to-admin.component.html',
  styleUrls: ['./loan-to-admin.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoanToAdminComponent implements OnInit {
  @Input() nameService: string;
  @Input() enterprise: string;
  @Input() ref: string;
  @Input() loading: boolean = false;
  @Input() editMode: boolean = false;
  @Input() data: any;
  @Input() bankList: any[];
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  public loadingItems: number = 5;
  @Input() tagnumber: string;

  constructor() {}

  ngOnInit(): void {
    if (!!this.bankList) {
      this._setBank();
    }
  }

  public _setBank(): void {
    const e = this.bankList.filter((bank) => bank.value === this.data.bank);
    this.enterprise = e[0].name;
  }

  public delete(): void {
    const dataToDelete = {
      action: 'DELETE',
      data: this.data,
    };
    this.deleteAction.emit(dataToDelete);
  }
}
