import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '../../../core/constants/navigate';

@Component({
  selector: 'app-choose-step',
  templateUrl: './choose-step.container.html',
  styleUrls: ['./choose-step.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ChooseStepContainer implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get navigate(): INavigate {
    return Navigate;
  }
}
