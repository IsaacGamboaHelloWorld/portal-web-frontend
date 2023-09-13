import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownSelectComponent implements OnInit, OnChanges {
  @Input() fixedOptions: object[] = [];
  @Input() dynamicOptions: object[] = [];
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() advancedLabel: boolean = false;
  @Output() event: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild('dd', null) select: ElementRef;
  public status: object = { valid: 'VALID', invalid: 'INVALID' };
  public options: SelectItem[] = [];

  constructor(private dom: ManipulateDomService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fixedOptions && this.fixedOptions.length > 0) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.options = [];
    this.defaultValue();
    this.fixedOptions.forEach((e) => {
      this.options.push({
        label: e['label'],
        value: e['value'],
        disabled: e['disabled'],
      });
    });
  }

  public setValueForm(event: Dropdown): void {
    this.event.emit(event.value);
    if (this.subProperty) {
      this.form.controls[this.property]['controls'][this.subProperty].setValue(
        event.value,
      );
    } else {
      this.form.controls[this.property].setValue(event.value);
    }
    this.dom.addClass('.cont-dropdown-select', 'no-ui-dropdown-hover');
  }
  public defaultValue(): void {
    this.form.addControl(
      `${this.subProperty ? this.property + this.subProperty : this.property}`,
      new FormControl(
        this.subProperty
          ? this.form.controls[this.property]['controls'][this.subProperty]
              .value
          : this.form.value[this.property],
      ),
    );
  }
}
