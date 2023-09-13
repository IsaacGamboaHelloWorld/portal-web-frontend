import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { CommonProfileComponent } from '@app/modules/profile/util/common-profile-template';

@Component({
  selector: 'app-education-data',
  templateUrl: './education-data.component.html',
})
export class EducationDataComponent extends CommonProfileComponent {
  constructor(
    protected dom: ManipulateDomService,
    protected model: ProfileModel,
    protected router: Router,
  ) {
    super(dom, model, router);
  }
}
