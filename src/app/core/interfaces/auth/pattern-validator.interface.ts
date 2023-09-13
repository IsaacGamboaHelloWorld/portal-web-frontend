import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxRepeatedCharsPatternValidator(
  regex: RegExp,
  error?: ValidationErrors,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const input: string = control.value;

    const valid = regex.test(
      input
        .split('')
        .sort()
        .join(''),
    );
    if (!valid) {
      error = { '': '' };
    }

    return valid ? null : error;
  };
}
