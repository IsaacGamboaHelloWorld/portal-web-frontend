import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-payments',
  templateUrl: './favorite-payments.component.html',
  styleUrls: ['./favorite-payments.component.sass'],
})
export class FavoritePaymentsComponent implements OnInit {
  @Input() actived: boolean = false;
  @Output() stateCheck: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public changeStatus(data: boolean): void {
    this.stateCheck.emit(data);
  }
}
