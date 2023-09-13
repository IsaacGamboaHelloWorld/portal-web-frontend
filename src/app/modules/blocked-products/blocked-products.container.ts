import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ModalService } from '../../shared/modal/services/modal.service';

@Component({
  selector: 'app-blocked-products',
  templateUrl: './blocked-products.container.html',
  styleUrls: ['./blocked-products.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockedProductsContainer implements OnInit {
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this._closeModal();
  }

  private _closeModal(): void {
    this.router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this.modalService.close();
      });
  }
}
