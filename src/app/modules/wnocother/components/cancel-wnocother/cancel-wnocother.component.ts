import { Location } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '../../../../core/constants/navigate';
import { WnocotherMoldel } from '../../wnocother.model';

@Component({
  selector: 'app-cancel-wnocother',
  templateUrl: './cancel-wnocother.component.html',
  styleUrls: ['./cancel-wnocother.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CancelWnocotherComponent implements OnDestroy {
  constructor(private model: WnocotherMoldel, private location: Location) {}

  ngOnDestroy(): void {
    this.model.setStepW(0);
    this.model.setTypeTransaction(null);
    this.model.sendWithDrawal(null, null, null, null, null);
    this.model.setDataForm({
      product: null,
      where: null,
      amount: null,
      otheramount: null,
      document: null,
    });
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public play(): void {
    this.model.stepW$
      .subscribe((data) => {
        this.model.setStepW(1);
      })
      .unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
