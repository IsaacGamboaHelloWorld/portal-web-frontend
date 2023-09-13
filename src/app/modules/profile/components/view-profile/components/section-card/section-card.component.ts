import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionCardComponent implements OnInit {
  @Input()
  public iconPath: string;

  @Input() public content: TemplateRef<any>;

  @Input() public title: string;

  @Input() public navPath: string;

  @Input()
  public buttonLabel: string;

  @Input()
  public selectedCard: string;

  @Output()
  public selectCard: EventEmitter<string> = new EventEmitter();

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  get isCollapsed(): boolean {
    return this.title !== this.selectedCard;
  }

  close(): void {
    this.selectCard.emit('');
  }

  open(): void {
    this.selectCard.emit(this.title);
  }

  editPage(): void {
    this.router.navigate([this.navPath], { relativeTo: this.route.parent });
  }
}
