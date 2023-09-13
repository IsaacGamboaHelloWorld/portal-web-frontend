import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { INavigateBiometric, NavigateBiometric } from '../../entities/routes';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TermsComponent {
  public rawId: string = '';
  constructor(private router: Router) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation()['extras']['state']
    ) {
      this.rawId = this.router.getCurrentNavigation().extras.state.rawId;
    }
  }
  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }
  public submitTerms(): void {
    this.router.navigate([this.navigate.name], {
      state: {
        rawId: this.rawId,
      },
    });
  }
}
