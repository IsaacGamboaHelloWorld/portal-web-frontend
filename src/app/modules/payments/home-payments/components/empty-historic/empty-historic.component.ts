import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-empty-historic',
  templateUrl: './empty-historic.component.html',
  styleUrls: ['./empty-historic.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyHistoricComponent {
  constructor() {}
}
