import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import {
  IPocketFormOne,
  IPocketFormTwo,
  SAVE_TOKEN,
} from '../../entities/new-pockets';
import { NewPocketFacade } from '../../new-pocket.facade';

@Component({
  selector: 'app-step-two-pocket',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoPocketsComponent implements OnInit {
  public formStepTwo: FormGroup;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private facade: NewPocketFacade,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
    this._initForm();
  }

  private _initForm(): void {
    this.facade.stepTwo$.subscribe((info) => {
      this.formStepTwo = new FormGroup({
        goal: new FormControl(info.goal, [
          Validators.required,
          Validators.min(1),
        ]),
      });
      setTimeout(() => {
        this.formStepTwo.controls['goal'].setValue(info.goal);
        this.formStepTwo.updateValueAndValidity();
      }, 1);
    });
  }

  public submitForm(): void {
    const data: IPocketFormTwo = {
      goal: this.formStepTwo.value.goal,
    };

    this.facade.setFormTwo(data);
    this.nextStep();
  }

  public nextStep(): void {
    this.setStep.emit(3);
  }

  get firstStep$(): Observable<IPocketFormOne> {
    return this.facade.firstStep$;
  }

  get typeSave(): string {
    return SAVE_TOKEN;
  }
}
