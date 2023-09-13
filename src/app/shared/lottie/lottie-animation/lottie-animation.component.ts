import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { lottieAnimation } from '@app/shared/helpers/lottie';

@Component({
  selector: 'app-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  styleUrls: ['./lottie-animation.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieAnimationComponent implements OnInit {
  @Input() path: string;
  @Input() renderer: string = 'svg';
  @Input() loop: boolean = false;
  @Input() autoplay: boolean = true;
  @Input() width: string = '80';
  @Input() height: string = '80';
  @ViewChild('animation', { static: true }) public animation: ElementRef;

  ngOnInit(): void {
    lottieAnimation(
      this.animation.nativeElement,
      this.path,
      this.renderer,
      this.loop,
      this.autoplay,
    );
  }
}
