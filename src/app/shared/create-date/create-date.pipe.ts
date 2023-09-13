import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createDate',
})
export class CreateDatePipe implements PipeTransform {
  transform(value: string): Date | string {
    return !!value ? new Date(value).toUTCString() : '';
  }
}
