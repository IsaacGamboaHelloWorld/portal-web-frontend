import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '@app/core/constants/navigate';

import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
@Component({
  selector: 'app-transfer-to-account',
  templateUrl: './transfer-to-account.container.html',
  styleUrls: ['./transfer-to-account.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TransferToAccountContainer implements OnInit {
  public backUrl: string;

  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }
  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.home;
    }
  }
  get navigate(): INavigate {
    return Navigate;
  }
}
