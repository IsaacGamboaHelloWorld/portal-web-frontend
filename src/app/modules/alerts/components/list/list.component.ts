import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IUserAlert } from '../../entities/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @Input() data: IUserAlert;
  public destinations: any[] = [];
  public accountName: any[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data['destinations']) {
      this.destinations = [...this.data['destinations']];
    }
  }
}
