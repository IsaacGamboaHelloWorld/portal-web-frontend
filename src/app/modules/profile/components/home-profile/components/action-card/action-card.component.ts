import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionCardComponent {
  @Input()
  public iconPath: string;

  @Input()
  public category: string;

  @Input()
  public description: string;

  @Input()
  public navPath: string;

  constructor(public router: Router, private route: ActivatedRoute) {}

  public redirectTo(): void {
    this.router.navigate([this.navPath], { relativeTo: this.route });
  }
}
