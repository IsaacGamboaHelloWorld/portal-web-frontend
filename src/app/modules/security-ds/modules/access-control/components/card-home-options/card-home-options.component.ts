import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ITypeChannel, TypeChannel } from '../../constants/type-channel.enum';

@Component({
  selector: 'app-card-home-options',
  templateUrl: './card-home-options.component.html',
  styleUrls: ['./card-home-options.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardHomeOptionsComponent implements OnInit {
  @Input() typeChannel: TypeChannel;
  @Input() lastSession: any;
  @Input() loading: boolean;
  @Input()
  get state(): boolean {
    return this._state;
  }
  set state(state: boolean) {
    // for backend false: unlocked, true: locked
    this._state = state;
    // for design true: locked, false: unlocked
    this.stateFront = !state;
  }
  private _state: boolean;

  @Output() stateEmit: EventEmitter<boolean>;
  public stateFront: boolean;

  constructor() {
    this.lastSession = '';
    this.loading = false;
    this.stateEmit = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  changeStatus(_event: any): void {
    this.stateEmit.emit(this.stateFront);
  }

  get getTypeChannel(): ITypeChannel {
    return TypeChannel;
  }
}
