import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ApplicationModel } from './../../../../application.model';

@Component({
  selector: 'app-product-free-destination',
  templateUrl: './product-free-destination.component.html',
  styleUrls: ['./product-free-destination.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductFreeDestinationComponent implements OnInit {
  @Input() product: FreeDestinationDetail;

  private type: string = TYPE_ACCOUNTS.FREE_DESTINATION;

  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
    private model: ApplicationModel,
  ) {}

  ngOnInit(): void {}

  public redirect(accountIndentifier: string): void {
    this.security.encryptAesGcm(accountIndentifier.toString()).then((data) => {
      this.router.navigate([Navigate.detail, this.type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  public payCredit(): void {}

  get hasProduct(): boolean {
    return (
      !isNullOrUndefined(this.product) &&
      !isNullOrUndefined(this.product.approvalAmount)
    );
  }

  get neededToPay(): boolean {
    return (
      !isNullOrUndefined(this.product) &&
      !isNullOrUndefined(this.product.dueDays) &&
      this.product.dueDays > 0
    );
  }

  // TODO: agregar formula calculo del porcentaje pagado
  get debt(): number {
    return null;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }
}
