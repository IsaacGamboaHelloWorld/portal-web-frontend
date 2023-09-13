import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../../shared/modal/services/modal.service';
import { HomePocketsFacade } from '../../home-pockets.facade';

@Component({
  selector: 'app-popup-onboarding',
  templateUrl: './popup-onboarding.component.html',
  styleUrls: ['./popup-onboarding.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupOnboardingComponent implements OnInit {
  public formStepOne: FormGroup;
  constructor(private facade: HomePocketsFacade, private modal: ModalService) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formStepOne = new FormGroup({
      not_show: new FormControl('', [Validators.required]),
    });
  }

  public preferencesSubmit(): void {
    const data: any = {
      pocketOnBoarding: this.formStepOne.value.not_show,
    };
    this.facade.setPrefs(data);
    this.modal.close();
  }
}
