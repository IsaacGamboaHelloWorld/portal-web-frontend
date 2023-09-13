import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  public textFilter: string = '';
  constructor() {}

  ngOnInit(): void {}
}
