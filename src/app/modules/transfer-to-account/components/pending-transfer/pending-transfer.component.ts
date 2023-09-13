import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IPendingTransferState } from '@store/reducers/models/transfer/pendingTransfer/pending-tranfer.reducer';

@Component({
  selector: 'app-pending-transfer',
  templateUrl: './pending-transfer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingTransferComponent {
  @Input() pending: IPendingTransferState;

  constructor() {}
}
