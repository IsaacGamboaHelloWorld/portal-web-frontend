import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { isNullOrUndefined } from 'util';
import {
  IOrderPaymentAll,
  IPayrollLoans,
} from '../../../home/entities/order-of-payment';

@Component({
  selector: 'app-order-of-payment-detail',
  templateUrl: './order-of-payment-detail.component.html',
  styleUrls: ['./order-of-payment-detail.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderOfPaymentDetailComponent implements OnInit {
  @Input() data: IOrderPaymentAll;
  @Input() id_data: { type: string; id: string } = { type: '', id: '' };
  public detail: IPayrollLoans;
  public sliceName: string;
  public statusDetail: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.data)) {
      for (const i of this.data.payrollLoans) {
        if (i.accountId === this.id_data.id) {
          this.detail = i;
          this.sliceName = i.company['sliceName'];
          this.statusDetail = i['statusDetail'];
        }
      }
    } else {
      this.router.navigate([this.navigate.home]);
    }
  }
  get navigate(): INavigate {
    return Navigate;
  }
}
