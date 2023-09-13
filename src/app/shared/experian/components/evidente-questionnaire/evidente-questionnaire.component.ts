import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { Events } from '@core/constants/events';
import {
  ExperianContractRequest,
  ExperianContractResponse,
  ExperianQuestionnaireAnswer,
  ExperianQuestionnaireAnswerOption,
  ExperianQuestions,
} from '../../entities/experian-entities';
import { AbstractExperianEvidenteComponent } from '../abstract.experian-evidente.component';
import { EventsService } from './../../../../core/services/tag_manager/events.service';

@Component({
  selector: 'app-evidente-questionnaire',
  templateUrl: './evidente-questionnaire.component.html',
  styleUrls: ['./evidente-questionnaire.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EvidenteQuestionnaireComponent extends AbstractExperianEvidenteComponent {
  @Input() data: ExperianContractResponse;
  @Input() btnClose: boolean;

  public typeActive: object;
  questionIndex: number = 0;
  numberOfQuestions: number;
  answer: string;

  selectedAnswers: object = {};

  constructor(private events: EventsService) {
    super();
  }

  protected _initForm(): void {
    this.form = new FormGroup({
      answer: new FormControl('', [Validators.required]),
    });
  }

  _next(): void {
    const idAnswerSelected = this.form.value.answer;
    const answerSelected: ExperianQuestionnaireAnswer = {
      idQuestion: this.data.questionnaire.questions[this.questionIndex]
        .idQuestion,
      idAnswer: idAnswerSelected,
    };
    this.selectedAnswers[this.questionIndex] = answerSelected;
    if (this.questions.length - 1 === this.questionIndex) {
      this._processSubmitAction();
    } else {
      this.form.reset();
      this.answer = null;
      this.questionIndex++;
    }
  }

  _processSubmitAction(): void {
    const dataToSubmit: ExperianContractRequest = {
      idQuestionnaire: this.data.questionnaire.id,
      answers: Object.values(this.selectedAnswers),
    };
    this.submitActionHandler(dataToSubmit);
  }

  get options(): ExperianQuestionnaireAnswerOption[] {
    const questions = this.questions;
    const currentQuestion = questions[this.questionIndex];
    return currentQuestion.answers;
  }

  get questions(): ExperianQuestions[] {
    return this.data.questionnaire.questions;
  }

  public setBorder(opt: object): void {
    this.form.controls.answer.setValue(opt['idAnswer']);
    this.typeActive = opt;
    switch (this.questionIndex + 1) {
      case 1:
        this._event(
          NavigateEnrollment.question_step1,
          TitlesEnrollment.question_step1,
        );
        break;
      case 2:
        this._event(
          NavigateEnrollment.question_step2,
          TitlesEnrollment.question_step2,
        );
        break;
      case 3:
        this._event(
          NavigateEnrollment.question_step3,
          TitlesEnrollment.question_step3,
        );
        break;
      case 4:
        this._event(
          NavigateEnrollment.question_step4,
          TitlesEnrollment.question_step4,
        );
        break;
    }
  }

  private _event(path: string, title: string): void {
    this.events.event({
      event: Events.page_view,
      pagePath: window.location.pathname + path,
      pageTitle: title,
    });
  }
}
