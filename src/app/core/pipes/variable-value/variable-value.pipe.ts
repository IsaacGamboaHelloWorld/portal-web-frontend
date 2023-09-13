import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variableValue',
})
export class VariableValuePipe implements PipeTransform {
  transform(baseName: any, suffix: any, context: any): any {
    return context[baseName + suffix];
  }
}
