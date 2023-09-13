import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { tns } from '../../../../../../node_modules/tiny-slider/src/tiny-slider';

@Component({
  selector: 'app-slider-on-boarding',
  templateUrl: './slider-on-boarding.component.html',
  styleUrls: ['./slider-on-boarding.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderOnBoardingComponent implements AfterViewInit {
  @Output() redirect: EventEmitter<void> = new EventEmitter<void>();
  @Output() showBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public index: any = 1;

  constructor() {}

  ngAfterViewInit(): void {
    const slider = tns({
      container: '.cont-slider-boarding',
      items: 1,
      slideBy: 'page',
      loop: false,
      autoplay: false,
      mouseDrag: true,
      controls: true,
      nav: true,
      autoplayButtonOutput: false,

      controlsText: ['', ''],
    });

    slider.events.on('transitionEnd', (evt: any) => {
      if (!isNullOrUndefined(evt.displayIndex)) {
        this.index = evt.displayIndex;
        this.showBtn.emit(this.index === 4);
      }
    });
  }

  get showButton(): boolean {
    return this.index === 4;
  }

  public showText(num: number): boolean {
    return this.index === num;
  }

  public clickRedirect(): void {
    this.redirect.emit();
  }
}
