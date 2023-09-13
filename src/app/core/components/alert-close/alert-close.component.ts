import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ImageCdnPipe } from '@app/core/pipes/image-cdn/image-cdn.pipe';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-alert-close',
  templateUrl: './alert.close.component.html',
  styleUrls: ['./alert-close.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [ImageCdnPipe],
})
export class AlertCloseComponent implements OnInit {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string;
  @Input() desc: string;
  @Input() img: string;
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() contIconColor: string;
  @Input() btnCancel: string;
  @Input() btnAgree: string;

  public loading: boolean = false;
  public classBtn: string;
  public classBtnCancel: string;

  constructor(private pipeImg: ImageCdnPipe) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.classBtn = this.hasBtnCancel
        ? 'btn btn-primary'
        : 'btn btn-primary btn-if';
      this.classBtnCancel =
        this.btnCancel === 'CODE_AUTH.MODAL_ALERT.CANCEL'
          ? 'btn btn-gray btn-if-green'
          : 'btn btn-gray';
    }, 10);
  }

  get hasTitle(): boolean {
    return !isNullOrUndefined(this.title);
  }

  get hasDesc(): boolean {
    return !isNullOrUndefined(this.desc);
  }

  get hasImg(): boolean {
    return !isNullOrUndefined(this.img);
  }

  get hasIcon(): boolean {
    return !isNullOrUndefined(this.icon);
  }

  get hasBtnCancel(): boolean {
    return !isNullOrUndefined(this.btnCancel);
  }

  get hasBtnAgree(): boolean {
    return !isNullOrUndefined(this.btnAgree);
  }

  public emitClick(): void {
    this.loading = true;
    this.actionAgree.emit();
  }

  public setStylesIconAlert(): any {
    const styles = {};
    styles['background-color'] = `${this.iconColor}`;
    styles['mask'] = `url(${this.pipeImg.transform(
      this.icon,
    )}) no-repeat center / contain`;
    styles['-webkit-mask'] = `url(${this.pipeImg.transform(
      this.icon,
    )}) no-repeat center / contain`;
    return styles;
  }
  public setStylesContIconAlert(): any {
    const styles = {};
    styles['background-color'] = `${this.contIconColor}`;
    return styles;
  }
}
