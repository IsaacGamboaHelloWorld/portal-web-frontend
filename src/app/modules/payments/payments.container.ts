import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.container.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaymentsContainer implements OnInit {
  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }
}
