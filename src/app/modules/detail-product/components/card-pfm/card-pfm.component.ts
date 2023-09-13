import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductPFMModel } from '@app/modules/detail-product-pfm/detail-product-pfm.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPfmProductState } from './../../../detail-product-pfm/store/reducer/product-detail-pfm.reducer';

@Component({
  selector: 'app-card-pfm',
  templateUrl: './card-pfm.component.html',
  styleUrls: ['./card-pfm.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPfmComponent implements OnInit {
  @Input() account: { type: string; id: string } = { type: '', id: '' };
  loading: boolean;

  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
    private model: DetailProductPFMModel,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._getDataInitPfm();
  }

  private _getDataInitPfm(): void {
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const currentMonth = now.getMonth().toString();
    this.model.fetchProductPfm(currentMonth, currentYear);
  }

  public goToPFM(): void {
    this.security.encryptAesGcm(this.account.id.toString()).then((data) => {
      this.router.navigate([
        Navigate.detailPFM,
        this.account.type.toLowerCase(),
        data,
      ]);
      this.dom.scrollTop();
    });
  }

  get hasDataPfm$(): Observable<boolean> {
    return this.model.detailProductPfm$.pipe(
      map((data: IPfmProductState) => this._mapProductPfm(data)),
    );
  }

  private _mapProductPfm(data: IPfmProductState): boolean {
    this.loading = data.loading;
    // tslint:disable-next-line:max-line-length
    return true; // TODO: deja esta línea y comentar lo de abajo para el paso a producción de pfm ya que solo hay data hasta mayo, y en front se valida el mes anterior al actual
    // if (
    //   !isNullOrUndefined(data) &&
    //   !isNullOrUndefined(data.data) &&
    //   !isNullOrUndefined(data.data.products) &&
    //   !isNullOrUndefined(this.account.id) &&
    //   !isNullOrUndefined(this.account.type)
    // ) {
    //   const products = data.data.products;
    //   const product = products.find(
    //     (p: PfmProduct) =>
    //       p.accountNumber === this.account.id &&
    //       p.type === TypeProductPfm[this.account.type.toUpperCase()],
    //   );
    //   return !isNullOrUndefined(product);
    // }
  }
}
