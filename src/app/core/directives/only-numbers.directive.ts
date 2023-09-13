import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) aonInputChange(event: Event): void {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    initialValue !== this._el.nativeElement.value
      ? event.stopPropagation()
      : null;
  }
}
