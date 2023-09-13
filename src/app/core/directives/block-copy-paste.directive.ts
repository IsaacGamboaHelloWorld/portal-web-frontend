import { Directive, HostListener } from '@angular/core';
import { environment } from '@environment';

@Directive({
  selector: '[appBlockCopyPaste]',
})
export class BlockCopyPasteDirective {
  constructor() {}

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent): void {
    if (environment.production) {
      e.preventDefault();
    }
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent): void {
    if (environment.production) {
      e.preventDefault();
    }
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent): void {
    if (environment.production) {
      e.preventDefault();
    }
  }
}
