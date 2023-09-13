import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PROFILE_ROUTES } from '../../util/routes';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewProfileComponent implements OnInit {
  selectedCard: string = '';
  constructor(private dom: ManipulateDomService, private router: Router) {}

  ngOnInit(): void {
    this.dom.scrollTop();
  }
  selectCard(card: string): void {
    this.selectedCard = card;
  }
  get routes(): { [key: string]: string } {
    return PROFILE_ROUTES;
  }
  public back(): void {
    this.router.navigate([Navigate.user_profile]);
  }
}
