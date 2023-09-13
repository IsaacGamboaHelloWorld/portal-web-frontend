import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { IfinancialResumeInterface } from '@core/interfaces/financialResume.interface';

@Component({
  selector: 'app-slider-fiance',
  templateUrl: './slider-finance.component.html',
  styleUrls: ['./slider-finance.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderFinanceComponent {
  @Input() items: IfinancialResumeInterface[];
  constructor() {}
}
