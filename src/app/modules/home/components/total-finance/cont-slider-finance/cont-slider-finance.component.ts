import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { IfinancialResumeInterface } from '@core/interfaces/financialResume.interface';

@Component({
  selector: 'app-cont-slider-finance',
  templateUrl: './cont-slider-finance.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContSliderFinanceComponent {
  @Input() items: IfinancialResumeInterface[];
  public showSlider: boolean = true;
  constructor() {}
}
