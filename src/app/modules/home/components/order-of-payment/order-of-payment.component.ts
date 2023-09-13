import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Navigate } from '@core/constants/navigate';
import { IPayrollLoans } from '../../entities/order-of-payment';
import { OrderOfPaymentService } from '../../services/order-of-payment.service';

@Component({
  selector: 'app-order-of-payment',
  templateUrl: './order-of-payment.component.html',
  styleUrls: ['./order-of-payment.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrderOfPaymentService],
})
export class OrderOfPaymentComponent implements OnInit, OnDestroy {
  @Input() items: IPayrollLoans[] = [];
  public statusDetail: string = 'CANCELADO';
  public filter: object[] = [];
  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
  ) {}

  ngOnInit(): void {
    if (this.items.length) {
      this.items = this.items.filter(
        (e) => e['statusDetail'] !== this.statusDetail,
      );
      this.filter = this.items;
    }
  }

  public redirect(type: string, id: string | number): void {
    this.security.encryptAesGcm(id.toString()).then((data) => {
      this.router.navigate([Navigate.detail, type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  ngOnDestroy(): void {
    this.filter = [];
  }
}
