import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

import { IHistoric } from '@store/reducers/models/transfer/historic/historic.reducer';

@Component({
  selector: 'app-historic-error',
  templateUrl: './historic-error.component.html',
  styleUrls: ['./historic-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricErrorComponent {
  @Input() historic: IHistoric;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get hasHistoric(): boolean {
    return !isNullOrUndefined(this.historic);
  }

  get emptyHistoric(): boolean {
    return (
      !isNullOrUndefined(this.historic.data) &&
      this.historic.loaded &&
      this.historic.data.length === 0
    );
  }

  get hasErrorText(): boolean {
    return (
      !isNullOrUndefined(this.historic.errorMessage) &&
      this.historic.errorMessage !== ''
    );
  }

  public btnClick(): void {
    this.clickBtn.emit();
  }
}
