import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function validateData(data: any, newData: any): any {
  return !isNullOrUndefined(data) ? data : newData;
}

export function validateType(validate: boolean, data: any, dataTwo: any): any {
  return validate ? data : dataTwo;
}

export function validateEmpty(data: string, defaultData: any): any {
  return !isNullOrUndefined(data) && data === '' ? defaultData : data;
}

export function validateNull(data: any, value: any, defaultData: any): any {
  return !isNullOrUndefined(data) ? value : defaultData;
}

export function validateAsyncForm(
  form: FormGroup,
  id: any,
  newValue: any,
  property: string,
  validations: any[],
  resetInput: boolean = true,
): void {
  if (!isNullOrUndefined(form) && !isNullOrUndefined(property)) {
    id === newValue
      ? form.get(property).setValidators(validations)
      : resetControl(form, property, resetInput);
    form.get(property).updateValueAndValidity();
  }
}

export function resetControl(
  form: FormGroup,
  property: string,
  reset: boolean,
): void {
  form.get(property).clearValidators();
  if (reset) {
    form.controls[property].reset();
  }
}
