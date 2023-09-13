import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ExperianContractRequest } from '../entities/experian-entities';

export abstract class AbstractExperianEvidenteComponent implements OnInit {
  @Output() submitAction: EventEmitter<
    ExperianContractRequest
  > = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() loading: boolean = false;

  public form: FormGroup;

  ngOnInit(): void {
    this._initForm();
  }

  protected abstract _initForm(): void;

  protected abstract _processSubmitAction(): void;

  get isLoading$(): Observable<boolean> {
    return of(this.loading);
  }

  public submitActionHandler(dataToSubmit: any): void {
    this.submitAction.emit(dataToSubmit);
  }

  public closeAction(): void {
    this.close.emit();
  }
}
