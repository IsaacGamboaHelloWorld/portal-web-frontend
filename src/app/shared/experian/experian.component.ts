import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import {
  ExperianContractRequest,
  ExperianContractResponse,
  ExperianStates,
  IExperianStates,
} from './entities/experian-entities';

@Component({
  selector: 'app-experian',
  templateUrl: './experian.component.html',
  styleUrls: ['./experian.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperianComponent implements OnInit {
  @Output() submitAction: EventEmitter<
    ExperianContractRequest
  > = new EventEmitter();
  @Output() submitCompletedFlow: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submitErrorFlow: EventEmitter<void> = new EventEmitter();
  @Input() isLoadingState: boolean;
  @Input() errorState: boolean;
  @Input() transactionCommitStep: boolean;
  @Input() data: ExperianContractResponse;
  @Input() viewBtnClose: boolean = false;

  questionIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data['step']) {
      switch (this.data['step']) {
        case 'FILL_QUESTIONNAIRE':
          const quest: any[] = this.data.questionnaire.questions;
          quest.forEach((element: any) => {
            element['question'] = this.formatText(element['question']);
            element['answers'].forEach((ans: any) => {
              ans['description'] = this.formatText(ans['description']);
            });
          });
          this.data.questionnaire.questions = quest;
          break;
      }
    }
  }

  get getStates(): IExperianStates {
    return ExperianStates;
  }

  get isLoadingAndIsNull(): boolean {
    return isNullOrUndefined(this.data) && this.isLoadingState;
  }

  public submitActionHandler(dataToSubmit: any): void {
    dataToSubmit['idTransactionOtp'] = this.data.idTransactionOtp;
    dataToSubmit['idValidationRecord'] = this.data.idValidationRecord;
    dataToSubmit['requiresQuestionnaire'] = this.data.requiresQuestionnaire;
    dataToSubmit['step'] = this.data['step'];
    this.submitAction.emit(dataToSubmit);
  }

  public submitCompletedFlowHandler(event: any): void {
    this.submitCompletedFlow.emit(event);
  }

  public submitErrorFlowHandler(event: any): void {
    this.submitErrorFlow.emit(event);
  }

  public actionClose(): void {
    this.close.emit();
  }

  public formatText(desc: string): string {
    return `${desc[0].toLocaleUpperCase()}${desc.slice(1).toLocaleLowerCase()}`;
  }
}
