import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDsDropDown } from './constants/ds-dropdown-interface';
import { ModalDropdownComponent } from './modal-dropdown/modal-dropdown.component';

@Component({
  selector: 'app-ds-dropdown-select',
  templateUrl: './ds-dropdown-select.component.html',
  styleUrls: ['./ds-dropdown-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsDropdownSelectComponent implements OnInit, AfterViewInit {
  @Input()
  get fixedOptions(): any[] {
    return this._fixedOptions;
  }
  set fixedOptions(fixedOptions: any[]) {
    this._fixedOptions = fixedOptions;
    this._initOptions();
  }
  private _fixedOptions: any[];

  @Input() dynamicOptions: object[] = [];
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() caption: string;
  @Input() advancedLabel: boolean;
  @Input() loading: boolean;
  @Input() disabled: boolean = false;
  @Input() typeInput: 'success' | 'error' | 'warning' | 'default';
  @Input() size: string = 'M';

  @Output() onShowEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClickEmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onChangeEmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onFocusEmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onBlurEmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onLoadingEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onLoadedEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public selectIndex: number = 0;
  public selectLabel: string = '';
  public selectValue: string | object | number;

  public options: IDsDropDown[] = [];
  public controlName: string;
  public isOpen: boolean = false;
  public filled: boolean;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    const id = 'ds-dropdown-' + this.propertiesConctact;
    const dropdown: any = document.getElementById(id);

    dropdown.addEventListener('click', () => {
      if (window.innerWidth >= 1024) {
        if (this.options.length && !this.disabled) {
          dropdown.classList.toggle('open');
        }
      } else {
        this.modalService.open(
          ModalDropdownComponent,
          true,
          `not-button-close mobile-bottom`,
          false,
          null,
          true,
          'content-bottom',
        );
        setTimeout(() => {
          this._actionsModal();
        }, 10);
      }
    });

    const customOptions: any = document.getElementsByClassName(
      '.custom-option-' + this.propertiesConctact,
    );
    for (const option of customOptions) {
      option.addEventListener('click', (event: any) => {
        if (!option.classList.contains('selected')) {
          option.parentNode
            .querySelector(`.custom-option-${this.propertiesConctact}.selected`)
            .classList.remove('selected');
          option.classList.add('selected');
          option
            .closest('.custom-select')
            .querySelector('.custom-select__trigger span').textContent =
            option.textContent;
        }
      });
    }

    window.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  ngOnInit(): void {
    this._initOptions();
  }

  private _initOptions(): void {
    this.options = [];
    if (this.fixedOptions === null || this.fixedOptions === undefined) {
      return;
    }
    this.fixedOptions.forEach((e) => {
      this.options.push({
        label: e['label'],
        value: e['value'],
      });
    });
    this.selectLabel = this.options.length ? this.options[0]['label'] : '';
    this._defaultValue();
  }

  public selected(
    select: object,
    index: number,
    withForm: boolean = true,
  ): void {
    this.selectIndex = index;
    this.selectLabel = select['label'];
    this.selectValue = select['value'];
    if (withForm) {
      this._setValueForm(select);
    }
    this.cd.detectChanges();
  }

  private _setSelectDefault(): void {
    const index = 0;
    this.selected(this.options[index], index);
  }

  private _setValueForm(event: any): void {
    if (!this.form || !this.form.controls) {
      return;
    }
    if (this.subProperty) {
      this.form.controls[this.property]['controls'][this.subProperty].setValue(
        event.value,
      );
    } else {
      this.form.controls[this.property].setValue(event.value);
    }
  }

  private _defaultValue(): void {
    if (!this.form || !this.form.addControl) {
      return;
    }
    this.controlName = `${
      this.subProperty ? this.property + this.subProperty : this.property
    }`;
    const value = !!this.subProperty
      ? this.form.controls[this.property]['controls'][this.subProperty].value
      : this.form.value[this.property];
    this.form.addControl(this.controlName, new FormControl(value));
    const objValue = this.options.find(
      (item: { value: string | object | number; label: string }) => {
        return item.value === value;
      },
    );
    const objIndex = this.options.findIndex(
      (item: { value: string | object | number; label: string }) => {
        return item.value === value;
      },
    );
    if (!!objValue && !!objIndex) {
      this.selected(objValue, objIndex, false);
    } else {
      this._setSelectDefault();
    }
  }

  public onChange($event: any): void {
    this.onChangeEmit.emit($event);
    this._setValueForm($event);
    const selectedOption = $event.selectedOption;
    this.filled = !!selectedOption;
  }

  public onShow(): void {
    this.isOpen = true;
    this.onShowEmit.emit(this.isOpen);
  }

  public onHide(): void {
    this.isOpen = false;
    this.onHideEmit.emit(this.isOpen);
  }

  public onClick($event: any): void {
    this.onClickEmit.emit($event);
  }

  public onFocus($event: any): void {
    this.onFocusEmit.emit($event);
  }

  public onBlur($event: any): void {
    this.onBlurEmit.emit($event);
  }

  get getPropertyAlias(): AbstractControl {
    return this.form.get(this.property);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.options = this.options;
      component.index = this.selectIndex;

      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((data: object) => {
          this.selected(data, data['ind']);
          this.modalService.close();
        });
      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
      });
    }
  }

  get propertiesConctact(): string {
    return `${
      !!this.subProperty ? this.property + this.subProperty : this.property
    }`;
  }
}
