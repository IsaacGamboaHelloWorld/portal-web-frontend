import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ds-input',
  templateUrl: './ds-input.component.html',
  styleUrls: ['./ds-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsInputComponent implements OnInit {
  @Input() typeText: string;
  @Input() typeInput: 'success' | 'error' | 'warning' | 'default' | 'info';
  @Input() placeholder: string;
  @Input()
  get value(): string {
    return this._value;
  }
  set value(data: string) {
    this._value = data;
    this.setValue = data;
  }
  private _value: string;
  @Input() label: string;
  @Input() caption: string;
  @Input() disabled: boolean;
  @Input() isMedium: boolean;
  @Input() useCurrency: boolean;

  @Input() action: string;
  @Input() iconLeft: string;
  @Input() iconRight: string;
  @Input() textTooltip: string;
  @Input() showIcon: boolean;

  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() blockCopyPaste: any;

  @Output() blurEmit: EventEmitter<any>;
  @Output() changesEmit: EventEmitter<any>;
  @Output() keydownEmit: EventEmitter<any>;
  @Output() keypressEmit: EventEmitter<any>;
  @Output() keyupEmit: EventEmitter<any>;
  @Output() eventIcon: EventEmitter<any>;

  @ViewChild('dsInput', { static: false }) dsInput: ElementRef;

  constructor() {
    this.typeText = 'text';
    this.typeInput = 'default';
    this.placeholder = '';
    this.value = '';
    this.label = '';
    this.caption = '';
    this.disabled = false;
    this.isMedium = false;
    this.useCurrency = false;

    this.action = '';
    this.iconLeft = '';
    this.iconRight = '';
    this.textTooltip = '';

    this.blurEmit = new EventEmitter<any>();
    this.changesEmit = new EventEmitter<any>();
    this.keydownEmit = new EventEmitter<any>();
    this.keypressEmit = new EventEmitter<any>();
    this.keyupEmit = new EventEmitter<any>();
    this.eventIcon = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this._checkType();
    this.defaultValue();
  }

  private _checkType(): void {
    switch (this.typeInput) {
      case 'default':
      case 'success':
        this.caption = '';
        break;
      default:
        break;
    }
  }

  public onBlur($event: any): void {
    this._onTyping(false);
    const { value } = $event.target;
    this._onFilled(!!value);
    this.blurEmit.emit($event);
  }

  public keydown($event: any): void {
    this.keydownEmit.emit($event);
  }

  public keyup($event: any): void {
    this.keypressEmit.emit($event);
  }

  public keypress($event: any): void {
    this.keyupEmit.emit($event);
  }

  public valuechange($event: any): void {
    this.changesEmit.emit($event);
    this._onTyping(true);
    this.setValueForm($event);
  }

  private _onFilled(isFilled: boolean): void {
    this._changeClassForElement(isFilled, 'filled');
  }

  private _onTyping(typing: boolean): void {
    this._changeClassForElement(typing, 'ds-typing');
  }

  private _getInputElement(): ElementRef['nativeElement'] {
    if (!this.dsInput || !this.dsInput.nativeElement) {
      return;
    }
    return this.dsInput.nativeElement;
  }

  private _changeClassForElement(isAdd: boolean, classes: string): void {
    const element = this._getInputElement();
    if (isAdd) {
      element.classList.add(classes);
    } else {
      element.classList.remove(classes);
    }
  }

  public setValueForm($event: any): void {
    const value = $event.target.value;
    if (!this.form || !this.form.controls) {
      return;
    }
    if (this.subProperty) {
      this.form.controls[this.property]['controls'][this.subProperty].setValue(
        value,
      );
    } else {
      this.form.controls[this.property].setValue(value);
    }
  }

  public defaultValue(): void {
    if (!this.form || !this.form.addControl) {
      return;
    }
    const name = `${
      this.subProperty ? this.property + this.subProperty : this.property
    }`;
    const value = this.subProperty
      ? this.form.controls[this.property]['controls'][this.subProperty].value
      : this.form.value[this.property];
    this.form.addControl(name, new FormControl(value));
    this.value = value ? value : this.value;
    setTimeout(() => {
      this._onFilled(!!this.value);
    }, 500);
  }

  set setValue(data: any) {
    if (!!this.form) {
      const name = `${
        !!this.subProperty ? this.property + this.subProperty : this.property
      }`;
      this.form.get(name).setValue(data);
    }
  }

  public clickIcon(): void {
    this.eventIcon.emit();
  }
  get getPropertyAlias(): AbstractControl {
    return this.form.get(this.property);
  }
}
