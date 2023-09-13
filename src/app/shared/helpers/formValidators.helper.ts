import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TYPE_ACCOUNTS } from '../../core/constants/types_account';
import { LoanDestinationInterface } from '../../core/interfaces/loan-destination.interface';
import { Product } from '../../core/models/products/product';
import { IProductActive } from '../../store/reducers/models/product-active/product-active.reducer';

export function setValidators(
  _formGroup: FormGroup,
  _arr: string[],
  _validators: ValidatorFn[] | null,
): void {
  for (const el of _arr) {
    _formGroup.controls[el].setValidators(_validators);
    _formGroup.controls[el].updateValueAndValidity();
  }
}

export function setAccountIdentifier(
  _formGroup: FormGroup,
  _fields: string[],
  _isTC: boolean,
): void {
  if (_isTC) {
    setValidators(_formGroup, _fields, [
      Validators.required,
      Validators.pattern(
        // tslint:disable-next-line:max-line-length
        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      ),
      Validators.maxLength(22),
    ]);
  } else {
    setValidators(_formGroup, _fields, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.maxLength(22),
    ]);
  }
}

export function setInitialValueCustomInfo(
  _activeProd: IProductActive,
  _prods: Product[],
  _loans: LoanDestinationInterface[],
  _formObj: FormGroup,
  _arr: string[],
): void {
  if (!isNullOrUndefined(_activeProd) && _activeProd.type !== undefined) {
    if (_activeProd.type.toUpperCase() !== TYPE_ACCOUNTS.CREDIT_CARD) {
      const product = _prods.find((account) => account.id === _activeProd.id);
      if (!isNullOrUndefined(_arr[0]) && !isNullOrUndefined(product)) {
        _formObj.controls[_arr[0]].setValue(product);
      }
    } else {
      const product = _loans.find(
        (account) => account.accountId === _activeProd.id,
      );
      if (!isNullOrUndefined(_arr[0]) && !isNullOrUndefined(product)) {
        _formObj.controls[_arr[1]].setValue(product);
      }
    }
  }
}
