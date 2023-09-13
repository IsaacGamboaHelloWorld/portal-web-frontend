import { Component, OnInit } from '@angular/core';
import { INavigate, Navigate } from '@app/core/constants/navigate';

@Component({
  selector: 'app-unusual-operations-container',
  templateUrl: './unusual-operations-container.component.html',
  styleUrls: ['./unusual-operations-container.component.sass'],
})
export class UnusualOperationsContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get mainNavigate(): INavigate {
    return Navigate;
  }
}
