import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DOCUMENT_TYPES } from '@app/core/constants/document_types';
import { CustomerProfile } from '@app/core/models/user/user-profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileCardComponent implements OnInit {
  @Input()
  public user: CustomerProfile;

  constructor() {}

  ngOnInit(): void {}

  get extractIdentificationType(): any[] {
    return DOCUMENT_TYPES.filter((element) => element.type === 'CC');
  }
}
