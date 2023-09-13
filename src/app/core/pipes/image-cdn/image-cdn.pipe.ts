import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { environment } from '@environment';

@Pipe({
  name: 'imageCdn',
})
export class ImageCdnPipe implements PipeTransform {
  transform(value: string): string {
    return !isNullOrUndefined(value)
      ? environment.resources.base_assets + '/assets/images' + value
      : value;
  }
}
