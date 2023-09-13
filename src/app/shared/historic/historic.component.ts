import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { checkNested } from '../helpers/checkNested.helper';
import { DEFAULT_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';
import { DateComponentTable } from './components/date/date.component';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoricComponent implements OnInit {
  @Input() title: string;
  @Input() numberColumns: number;
  @Input() nameColumns: string[] = [];
  @Input() dataTable: object[] = [];
  @Input() showSearch: boolean = true;
  @Input() bodyWithCard: boolean = false;

  public dataPaginator: object[] = [];
  public filterState: boolean = false;
  public emptyState: boolean = true;
  public textFilter: string = '';
  public dateFilter: object[] = [];
  public responseFilter: object;
  public hasFilter: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  public resultPaginator(event: object[]): void {
    this.dataPaginator = event;
  }

  public openSearchBox(): void {
    this.filterState = !this.filterState;

    if (!this.filterState) {
      this.textFilter = '';
      this.emptyState = true;
    }
  }
  public doClear(event: any): void {
    event.preventDefault();
    this.textFilter = '';
    this.emptyState = true;
  }

  public onChange(event: any): void {
    if (this.textFilter === '') {
      this.emptyState = true;
    }
  }
  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
  }
  public openFilter(): void {
    this.modalService.open(
      DateComponentTable,
      true,
      `${DEFAULT_WIDTH}`,
      true,
      this.dataTable,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }
  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((response: object) => {
          this.responseFilter = response;
          this.hasFilter = response['hasFilter'];
          this.dateFilter = response['data'];
        });
    }
  }
  public removeFilter(): void {
    this.responseFilter = {};
    this.hasFilter = false;
    this.dateFilter = [];
  }
}
