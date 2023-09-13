import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/modal/services/modal.service';

@Component({
  selector: 'app-modal-move-pockets',
  templateUrl: './modal-move-pockets.component.html',
  styleUrls: ['./modal-move-pockets.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalMovePocketsComponent implements OnInit {
  @Input() title: string;
  @Input() desc: string;
  @Input() value: number;
  @Input() account: string;
  @Input() img: string;
  @Input() btnCancel: string;
  @Input() btnAgree: string;
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();
  public loading: boolean = false;
  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {}

  public emitClick(): void {
    this.actionAgree.emit();
  }
}
