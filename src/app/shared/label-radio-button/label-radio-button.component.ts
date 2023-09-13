import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-label-radio-button',
  templateUrl: './label-radio-button.component.html',
  styleUrls: ['./label-radio-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelRadioButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() index: number = 0;
  @Input() value: any = null;
  @Input()
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(active: boolean) {
    this._isActive = active;
    if (active) {
      setTimeout(() => this.setClass(), 10);
    }
  }
  private _isActive: boolean = false;

  @Output() checkEvent: EventEmitter<number> = new EventEmitter();

  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {}

  public setClass(): void {
    this.dom.removeMultipleClass('[class^="type-lbr-"]', 'active-lbr');
    this.dom.addClass(`.type-lbr-${this.index}`, 'active-lbr');
    this.checkEvent.emit(this.index);
  }
}
