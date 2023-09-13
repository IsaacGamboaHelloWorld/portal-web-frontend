import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { IToPlus } from '@modules/main-container/constants/to-plus';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-to-plus',
  templateUrl: './product-to-plus.component.html',
  styleUrls: ['./product-to-plus.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductToPlusComponent {
  @Input() product: IToPlus;
  constructor(private _router: Router) {}

  public goToTuPlus(): void {
    this._router.navigate([Navigate.your_plus]);
  }

  public redeem(): void {
    this._router.navigate([Navigate.your_plus]);
  }

  get hasProduct(): boolean {
    return !isNullOrUndefined(this.product);
  }

  get navigate(): INavigate {
    return Navigate;
  }
}
