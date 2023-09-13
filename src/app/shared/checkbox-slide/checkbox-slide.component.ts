import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { randowText } from '../helpers/randow-text.helper';

@Component({
  selector: 'app-checkbox-slide',
  templateUrl: './checkbox-slide.component.html',
  styleUrls: ['./checkbox-slide.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxSlideComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() id: string = randowText();
  @Input() check: boolean = false;
  @Input() inline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() text: string;
  @Input() hidelabel: boolean = false;
  @Output() stateCheck: EventEmitter<boolean> = new EventEmitter<false>();

  constructor() {}

  ngOnInit(): void {}

  public toggleCheck(): void {
    this.check = !this.check;
    this.stateCheck.emit(this.check);
    !!this.form && !isNullOrUndefined(this.property)
      ? this.form.controls[this.property].setValue(this.check)
      : null;
  }
}
