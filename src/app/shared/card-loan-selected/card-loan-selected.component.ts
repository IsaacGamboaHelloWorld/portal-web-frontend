import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-loan-selected',
  templateUrl: './card-loan-selected.component.html',
  styleUrls: ['./card-loan-selected.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardLoanSelectedComponent implements OnInit {
  @Input() label: string;
  @Input() dataCard: any;
  @Input() options: object[] = [];
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() append: any;
  @Input() ifDefaultData: any;

  public visibleModal: boolean;
  public viewFull: boolean;
  public data: any = null;

  constructor() {}

  ngOnInit(): void {
    this.data = this.ifDefaultData ? this.ifDefaultData : this.dataCard;
    if (this.data) {
      this.form.controls[this.property].setValue(this.data);
    }
  }
}
