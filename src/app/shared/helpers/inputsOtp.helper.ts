import { FormGroup } from '@angular/forms';

export function clearWithBackspaceOtp(index: number, e: KeyboardEvent): void {
  const target: any = e.target;
  if (e.key === 'Backspace') {
    if (index > 0) {
      target.previousSibling.focus();
      target.value = '';
    }
    e.preventDefault();
  }
}

export function inputOtp(
  index: number,
  e: KeyboardEvent,
  maxOptLenght: number,
  formG: FormGroup,
): void {
  const target: any = e.target;
  target.focus();
  if (isNumberKeyEvent(e) && !!target.value && target.value.length > 0) {
    target.value = e.code === '' ? target.value.slice(-1) : e.key;
    if (index < maxOptLenght - 1) {
      target.nextSibling.focus();
    }
    e.preventDefault();
  }
  formG.controls[`char${index}`].setValue(e.target['value']);
}

export function isNumberKeyEvent(event: any): boolean {
  return (
    event.code.includes('Digit') ||
    (event.code.includes('Numpad') && isDigit(event.key)) ||
    (event.code === '' && isDigit(event.target.value.slice(-1)))
  );
}

export function isDigit(str: string): boolean {
  return parseInt(str, 10) >= 0 && parseInt(str, 10) <= 9;
}
