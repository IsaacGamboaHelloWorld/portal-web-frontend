import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent {
  @Output() showSlider: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public slider(): void {
    this.showSlider.emit();
  }
}
