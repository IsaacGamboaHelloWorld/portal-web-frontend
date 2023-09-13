import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './store/model/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  constructor(private model: ProfileModel) {}

  ngOnInit(): void {
    this.model.loadCatalogs();
  }
}
