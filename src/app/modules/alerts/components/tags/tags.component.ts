import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TagsComponent implements OnInit {
  @Input() type: any;
  @Output() eventType: EventEmitter<number> = new EventEmitter();
  public tagType: number = 1;
  public selectTag: object = { id: null, select: null };
  constructor() {}

  ngOnInit(): void {}

  public tagEvent(type: number): void {
    this.eventType.emit(type);
    this.tagType = type;
  }
}
