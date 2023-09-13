import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  @Input() dataColumnOne: TemplateRef<any>;
  @Input() dataColumnTwo: TemplateRef<any>;
  @Input() amount: string;
  @Input() pending: string;
  @Input() status: string;
  @Input() typeStatus: string;

  public showInfo: boolean = false;

  constructor() {}

  get hasData(): boolean {
    return (
      !isNullOrUndefined(this.dataColumnOne) &&
      !isNullOrUndefined(this.dataColumnTwo)
    );
  }

  get isPending(): boolean {
    return !isNullOrUndefined(this.pending);
  }

  public toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }
}
