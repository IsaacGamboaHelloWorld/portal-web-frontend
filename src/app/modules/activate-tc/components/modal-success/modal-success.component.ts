import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { INavigateActivateTc, NavigateActivateTc } from '../../entities/routes';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSuccessComponent implements OnInit {
  public img: string = '/tarjeta-credito@3x.png';
  public loading: boolean = false;

  constructor(private modalService: ModalService, private router: Router) {}

  get navigate(): INavigateActivateTc {
    return NavigateActivateTc;
  }

  ngOnInit(): void {}

  public emitClick(): void {
    this.modalService.close();
    this.router.navigate([this.navigate.home]);
  }

  public doNew(): void {
    this.modalService.close();
  }
}
