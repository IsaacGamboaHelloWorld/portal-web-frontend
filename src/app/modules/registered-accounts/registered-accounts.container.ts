import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-registered-accounts',
  templateUrl: './registered-accounts.container.html',
  encapsulation: ViewEncapsulation.None,
})
export class RegisteredAccountsContainer implements OnInit {
  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }
}
