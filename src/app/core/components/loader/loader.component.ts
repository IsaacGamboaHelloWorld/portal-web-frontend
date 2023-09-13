import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent implements OnInit {
  public loading: boolean;
  public subscribe: Subscription = new Subscription();
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private loaderService: LoaderService,
    private modalService: ModalService,
  ) {}
  ngOnInit(): void {
    this.loaderService.isLoading
      .pipe(takeUntil(this._destroy$))
      .subscribe((value: boolean) => {
        this.loading = value;
      });
    setTimeout(() => {
      this.modalService.close();
    }, 2000);
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }
}
