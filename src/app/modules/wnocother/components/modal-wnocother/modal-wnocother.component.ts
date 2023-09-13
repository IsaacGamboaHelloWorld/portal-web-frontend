import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-wnocother',
  templateUrl: './modal-wnocother.component.html',
  styleUrls: ['./modal-wnocother.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalWnocotherComponent implements OnInit {
  public check: boolean = false;
  public listRules: string[] = this.translateService.instant(
    'WITHDRAWAL.MODAL.LIST_RULES',
  );
  constructor(
    private translateService: TranslateService,
    private modelNews: NewsModel,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {}

  public emitClick(): void {
    if (this.check) {
      const data: any = {
        wconother: false,
      };
      this.modelNews.setPrefs(data);
    }
    this.modalService.close();
  }
}
