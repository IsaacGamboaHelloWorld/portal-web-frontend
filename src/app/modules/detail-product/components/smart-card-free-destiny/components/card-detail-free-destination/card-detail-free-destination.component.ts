import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';

@Component({
  selector: 'app-card-detail-free-destination',
  templateUrl: './card-detail-free-destination.component.html',
  styleUrls: ['./card-detail-free-destination.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDetailFreeDestinationComponent implements OnInit {
  @Input() data: FreeDestinationDetail;

  constructor() {}

  ngOnInit(): void {}
}
