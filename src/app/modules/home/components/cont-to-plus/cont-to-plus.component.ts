import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IToPlus } from '@modules/main-container/constants/to-plus';

@Component({
  selector: 'app-cont-to-plus',
  templateUrl: './cont-to-plus.component.html',
  styleUrls: ['./cont-to-plus.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContToPlusComponent {
  @Input() product: IToPlus;
  constructor() {}
}
