import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IScheduledTransferSearch } from '@app/core/interfaces/scheduledTransfer.interface';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ModalDetailScheduledComponent } from './modal-detail-scheduled/modal-detail-scheduled.component';

@Component({
  selector: 'app-scheduled-transfer',
  templateUrl: './scheduled-transfer.component.html',
  styleUrls: ['./scheduled-transfer.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ScheduledTransferComponent implements OnInit {
  public today: object = new Date();
  public iconArrow: string = '/arrow-left-scheduled.svg';
  public iconColor: boolean = false;
  @Input() scheduleds: IScheduledTransferSearch[];
  @Input() ip: string;
  @ViewChild('scroll', null) public scroll: ElementRef;
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.scheduleds = this.scheduleds.filter(
      (e) =>
        e.scheduleInfo['numberDesiredPayments'] !==
        e.scheduleInfo['numberRemainingPayments'],
    );
  }

  @HostListener('scroll', ['$event']) scrollHandler(e: Event): void {
    this.iconColor = false;
    this.iconArrow = '/arrow-left-scheduled.svg';
    const pos =
      this.scroll.nativeElement.scrollLeft +
      this.scroll.nativeElement.offsetWidth;
    const max = this.scroll.nativeElement.scrollWidth;
    if (pos === max) {
      this.iconArrow = '/arrow-right-scheduled.svg';
      this.iconColor = true;
    }
  }

  public moreInfo(scheduled: object): void {
    scheduled['ip'] = this.ip;
    this.modalService.open(
      ModalDetailScheduledComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
      false,
      scheduled,
    );
  }

  public onLeft(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  public onRight(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }
}
