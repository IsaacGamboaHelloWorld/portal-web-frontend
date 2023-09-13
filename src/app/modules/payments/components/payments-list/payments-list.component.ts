import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SMALL_WIDTH_NO_CLOSE } from '@app/shared/modal/constants/modal.style';
import { Observable } from 'rxjs';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { BillsRegisteredState } from '../../../../store/reducers/models/payment/payment-bills/all-registered-bills.reducer';
import { PaymentModel } from '../../payment.model';
import { ModalSearchComponent } from '../modal-search/modal-search.component';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsListComponent implements OnInit {
  public loadingItems: number = 3;
  constructor(private model: PaymentModel, private modal: ModalService) {}

  ngOnInit(): void {
    this.model.searchAllRegistered();
  }

  get initialData$(): Observable<BillsRegisteredState> {
    return this.model.serviceAll$;
  }

  get initialLoadedData$(): Observable<boolean> {
    return this.model.serviceAllLoaded$;
  }
  get initialLoadingData$(): Observable<boolean> {
    return this.model.serviceAllLoading$;
  }
  get initialErrorData$(): Observable<boolean> {
    return this.model.serviceAllError$;
  }

  public doOpenSearch(): void {
    this.modal.open(ModalSearchComponent, true, `${SMALL_WIDTH_NO_CLOSE}`);
  }

  public retry(): void {
    this.model.searchAllRegistered();
  }
}
