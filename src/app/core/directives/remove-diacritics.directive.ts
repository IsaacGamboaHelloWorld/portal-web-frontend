import { Directive, ElementRef, HostListener } from '@angular/core';

import { removeDiacritics } from '@app/shared/helpers/remove-signs-diacritics.helper';

@Directive({
  selector: '[appRemoveDiacritics]',
})
export class RemoveDiacriticsDirective {
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) aonInputChange(event: Event): void {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = removeDiacritics(initialValue);
    initialValue !== this._el.nativeElement.value
      ? event.stopPropagation()
      : null;
  }
}
