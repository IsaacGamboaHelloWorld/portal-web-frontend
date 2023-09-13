import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appStateInput]',
})
export class StateInputDirective {
  @Input() formState: FormGroup;
  @Output() viewError: EventEmitter<boolean> = new EventEmitter<boolean>();
  public status: object = { valid: 'VALID', invalid: 'INVALID' };

  constructor(private render: Renderer2) {}

  @HostListener('focus', ['$event']) focus(e: object): void {
    this.setState(e['srcElement'], 'set-state-focused', 1);
  }

  @HostListener('blur', ['$event.target']) blur(e: object): void {
    this.render.removeClass(e, 'set-state-focused');
    if (this.formState.status === this.status['valid']) {
      this.render.removeClass(e, 'set-state-error');
      this.setState(e, 'set-state-success', 2);
    } else {
      this.setState(e, 'set-state-error', 3);
    }
  }

  @HostListener('input', ['$event']) change(e: object): void {
    this.viewError.emit(this.formState.status === this.status['valid']);
  }

  public setState(element: object, classForm: string, state: number): void {
    switch (state) {
      case 1:
        this.render.addClass(element, classForm);
        break;
      case 2:
        this.render.addClass(element, classForm);
        break;
      case 3:
        this.render.addClass(element, classForm);
        break;
    }
  }
}
