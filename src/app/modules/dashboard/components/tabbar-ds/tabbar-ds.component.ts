import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabbar-ds',
  templateUrl: './tabbar-ds.component.html',
  styleUrls: ['./tabbar-ds.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbarDsComponent implements OnInit, OnDestroy {
  @Input() disable1: boolean = false;
  @Input() disable2: boolean = false;
  @Input() disable3: boolean = false;
  @Input() disable4: boolean = false;
  @Input() disable5: boolean = false;

  @Input() show1: boolean = false;
  @Input() show2: boolean = false;
  @Input() show3: boolean = false;
  @Input() show4: boolean = false;
  @Input() show5: boolean = false;

  public options: any[] = [
    {
      name: 'TABBAR.ITEM_ONE',
      icon: 'icon-ds-withdraft',
      url: this.navigate.wnocandother,
    },
    {
      name: 'TABBAR.ITEM_TWO',
      icon: 'icon-ds-recharge',
      url: this.navigate.recharge_phone,
    },
    {
      name: 'TABBAR.ITEM_THREE',
      icon: 'icon-ds-products',
      url: this.navigate.home,
    },
    {
      name: 'TABBAR.ITEM_FOUR',
      icon: 'icon-ds-pay',
      url: this.navigate.paymentsv2,
    },
    {
      name: 'TABBAR.ITEM_FIVE',
      icon: 'icon-ds-transfer',
      url: this.navigate.transfer,
    },
  ];

  public urlActive: string;

  constructor(private _router: Router, private _cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.urlActive = this._router.url;
    this._router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((data: any) => {
        this.urlActive = data.url;
        this._cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.urlActive = '';
  }

  public redirect(item: any): void {
    this.urlActive = item.url;
    this._router.navigate([item.url]);
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public getValue(baseName: string, suffix: any): boolean {
    return this[baseName + suffix];
  }
}
