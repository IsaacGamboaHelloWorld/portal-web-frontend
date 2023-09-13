import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { SearchPipe } from '../search/search.pipe';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [SearchPipe],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() data: object[] = [];
  @Input() dataDate: object[] = [];
  @Output() dataPaginator: EventEmitter<object> = new EventEmitter<object>();
  @Input() filter: string = '';
  @Input() hasFilter: boolean;

  public totalRecords: number;
  public objPaginator: object;
  public currentPage: number;
  public count: number = 1;
  public totalPages: number;
  constructor(private pipeFilter: SearchPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    let list: object[] = [];
    list = this.setDataPaginator(this.filter, this.dataDate);
    this.objPaginator = this.paginator(list, this.count, 5);
    this.dataPaginator.emit(this.objPaginator['data']);
    this.totalPages = this.objPaginator['total_pages'];
    this.totalRecords = list.length;
  }
  ngOnInit(): void {
    this.totalRecords = this.data.length;
    this.objPaginator = this.paginator(this.data, this.count, 5);
    this.totalPages = this.objPaginator['total_pages'];
    this.dataPaginator.emit(this.objPaginator['data']);
  }

  public paginator(
    items: object[],
    current_page?: number,
    per_page_items?: number,
  ): object {
    const page = current_page || 1;
    const per_page = per_page_items || 5;
    const offset = (page - 1) * per_page;
    const paginatedItems = items.slice(offset).slice(0, per_page_items);
    const total_pages = Math.ceil(items.length / per_page);

    return {
      page,
      per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages,
      data: paginatedItems,
    };
  }

  public nextPage(): void {
    let list: object[] = [];
    if (this.count === this.totalPages) {
      this.count = this.totalPages;
    } else {
      this.count++;
    }
    list = this.setDataPaginator(this.filter, this.dataDate);
    this.objPaginator = this.paginator(list, this.count, 5);
    this.dataPaginator.emit(this.objPaginator['data']);
  }

  public prevPage(): void {
    let list: object[] = [];
    this.count--;
    if (this.count === 0) {
      this.count = 1;
    }
    list = this.setDataPaginator(this.filter, this.dataDate);
    this.objPaginator = this.paginator(list, this.count, 5);
    this.dataPaginator.emit(this.objPaginator['data']);
  }

  public setDataPaginator(filter?: string, dataDate?: object[]): object[] {
    if (filter) {
      return this.pipeFilter.transform(
        this.dataDate.length ? this.dataDate : this.data,
        this.filter,
      );
    }
    if (dataDate && this.hasFilter) {
      return this.dataDate.length ? this.dataDate : [];
    }
    return this.data;
  }
}
