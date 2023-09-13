import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { environment } from '@environment';

@Pipe({
  name: 'fileCdn',
})
export class FileCdnPipe implements PipeTransform {
  transform(value: string): string {
    return !isNullOrUndefined(value)
      ? environment.resources.base_assets + '/assets/files' + value
      : value;
  }
}
