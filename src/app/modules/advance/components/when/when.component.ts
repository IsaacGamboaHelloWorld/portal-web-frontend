import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import {
  advanceConfirmation,
  advanceRootRoute,
} from '@modules/advance/constants/routes';
import { StepService } from '@modules/advance/services/step.service';
import { TODAY } from '@modules/transfer-to-account/constants/calendar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-when',
  templateUrl: './when.component.html',
  styleUrls: ['./when.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhenComponent implements OnInit {
  public formWhen: FormGroup;
  public typeActive: string = '';
  public newDate: object = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stepService: StepService,
    private facade: AdvanceFacade,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.stepService.setStep(3);
    this._initForm();
    this.dom.scrollTop();
  }

  get today(): string {
    return TODAY;
  }

  get show(): boolean {
    return this.stepService.step === 3;
  }

  public formSubmit(): void {
    const { dueDate } = this.formWhen.value;
    this.facade.setWhen(dueDate);
    this.stepService.setStep(4);
    this.router.navigate([`/${advanceRootRoute}/${advanceConfirmation}`]);
  }

  public selectedOption(nameScheduled: string): void {
    this.typeActive = nameScheduled;
  }

  private _initForm(): void {
    this.facade.formGlobal$.pipe(take(1)).subscribe((data) => {
      this.formWhen = this.fb.group({
        dueDate: [validateData(data.date, ''), Validators.required],
      });
    });
  }
}
