import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-service-to-admin',
  templateUrl: './service-to-admin.component.html',
  styleUrls: ['./service-to-admin.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceToAdminComponent implements OnInit {
  @Input() nameService: string;
  @Input() enterprise: string;
  @Input() ref: string;
  @Input() loading: boolean = false;
  @Input() editMode: boolean = false;
  @Input() selected: boolean = false;
  @Input() data: any;
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() tagnumber: string;

  public loadingItems: number = 5;

  constructor() {}

  ngOnInit(): void {}

  public delete(): void {
    const dataToDelete = {
      action: 'DELETE',
      data: this.data,
      tag: this.tagnumber,
    };
    this.deleteAction.emit(dataToDelete);
  }
}
