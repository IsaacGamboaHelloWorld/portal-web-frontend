import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPublicService } from '../../modules/paymentsv2/public-services/entities/public-services';

@Component({
  selector: 'app-card-service-selected',
  templateUrl: './card-service-selected.component.html',
  styleUrls: ['./card-service-selected.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardServiceSelectedComponent implements OnInit {
  @Input() label: string;
  @Input() dataCard: IPublicService;
  @Input() options: object[] = [];
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() append: any;
  @Input() ifDefaultData: IPublicService;

  public visibleModal: boolean;
  public viewFull: boolean;
  public data: IPublicService = null;

  constructor() {}

  ngOnInit(): void {
    this.data = this.ifDefaultData ? this.ifDefaultData : this.dataCard;
    if (this.data) {
      this.form.controls[this.property].setValue(this.data);
    }
  }
}
