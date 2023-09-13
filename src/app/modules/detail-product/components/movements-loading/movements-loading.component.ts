import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MovementsState } from '@store/reducers/models/movements/movement.reducer';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-movements-loading',
  templateUrl: './movements-loading.component.html',
  styleUrls: ['./movements-loading.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MovementsLoadingComponent {
  @Input() movements: MovementsState;
  @Input() accountdata: any;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get hasErrorMessage$(): boolean {
    return (
      !isNullOrUndefined(this.movements.errorMessage) &&
      this.movements.errorMessage !== ''
    );
  }

  public btnClick(): void {
    this.clickBtn.emit();
  }
}
