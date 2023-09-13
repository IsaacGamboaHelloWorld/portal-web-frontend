import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IScheduleTransferDelete } from '@app/core/interfaces/scheduledTransfer.interface';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { environment } from '@environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-detail-scheduled',
  templateUrl: './modal-detail-scheduled.component.html',
  styleUrls: ['./modal-detail-scheduled.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalDetailScheduledComponent implements OnInit {
  public viewOptions: boolean = true;
  public viewDetail: boolean = false;
  public viewCancel: boolean = false;
  public today: object = new Date();
  public loading: boolean = false;
  public infoScheduled: object;
  public _cost: string;

  constructor(
    private translate: TranslateService,
    private modalService: ModalService,
    private _modelTransfer: TransferModel,
    public dialogConfig: DialogConfig,
    private http: HttpClient,
  ) {}

  get options$(): Observable<string[]> {
    return this.translate.get('TRANSFER.SCHEDULED.MODAL.OPTIONS');
  }

  get transferScheduledDelete(): Observable<IScheduleTransferDelete> {
    return this._modelTransfer.transferScheduledDelete$;
  }

  ngOnInit(): void {
    this.infoScheduled = this.dialogConfig.data;
    this.today = this.infoScheduled['scheduleInfo']
      ? this.infoScheduled['scheduleInfo']['transactionExecutionDate']
      : new Date();
    this.calculateCost();
  }
  public selectOption(opt: string, ind: number): void {
    switch (ind) {
      case 0:
        this.viewOptions = false;
        this.viewDetail = true;
        this.viewCancel = false;
        break;
      case 1:
        this.viewOptions = false;
        this.viewDetail = false;
        this.viewCancel = true;
        break;
    }
  }

  public close(): void {
    this.modalService.close();
  }

  public delete(): void {
    this.loading = true;
    this._modelTransfer.fetchScheduledDelete(
      this.infoScheduled['scheduleInfo']['id'],
    );
    this.transferScheduledDelete.subscribe((data) => {
      if (data.success) {
        this.loading = false;
        this._modelTransfer.resetScheduled();
        this._modelTransfer.fetchScheduled();
        this.modalService.close();
      }
      if (data.errorMessage) {
        this.loading = false;
      }
    });
  }
  private calculateCost(): void {
    const request = {
      accountFromInformation: {
        accountIdentifier: this.infoScheduled['accountFromInformation'][
          'accountIdentifier'
        ],
        productType: this.infoScheduled['accountFromInformation'][
          'productType'
        ],
      },
      accountToInformation: {
        accountIdentifier: this.infoScheduled['accountToInformation'][
          'accountIdentifier'
        ],
        bank: this.infoScheduled['accountToInformation']['bank'],
        productType: this.infoScheduled['accountToInformation']['productType'],
      },
    };

    this.http
      .post(
        environment.api.base + environment.api.services.transfers.cost,
        request,
      )
      .subscribe((response: any) => {
        this._cost = response.cost;
      });
  }
}
