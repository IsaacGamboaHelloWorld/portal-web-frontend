import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { CommonProfileComponent } from '@app/modules/profile/util/common-profile-template';

@Component({
  selector: 'app-financial-data',
  templateUrl: './financial-data.component.html',
})
export class FinancialDataComponent extends CommonProfileComponent {
  constructor(
    protected dom: ManipulateDomService,
    protected model: ProfileModel,
    protected router: Router,
  ) {
    super(dom, model, router);
  }
}