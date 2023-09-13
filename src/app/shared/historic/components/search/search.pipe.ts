import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterTable' })
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return JSON.stringify(it)
        .toLocaleLowerCase()
        .includes(searchText);
    });
  }
}
