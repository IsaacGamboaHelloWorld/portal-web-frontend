import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OptionModuleState } from './../../../../store/reducers/global/option-module/option-module.reducer';

import { ApplicationModel } from '@app/application.model';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { ILoadPrefs } from '@app/shared/news/store/reducers/news.reducers';
import { INavigate, Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { environment } from '@environment';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menulat',
  templateUrl: './menulat.component.html',
  styleUrls: ['./menulat.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MenulatComponent implements OnInit, OnDestroy, AfterViewInit {
  public showNav: boolean = false;
  public showOnboarding: number = 0;
  public indexEdit: number = 0;
  public display: boolean = null;
  public newIdItem: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public element: ElementRef;
  public elementP: ElementRef;
  public logoImg: string = '/logo-logotipo-vertical-normal.svg';
  @ViewChild('listMenu', null) list: ElementRef;
  constructor(
    @Inject('isMobile') public isMobile: boolean,
    private dom: ManipulateDomService,
    private model: ApplicationModel,
    private modelNews: NewsModel,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const ulElement = this.list.nativeElement;
    if (!!ulElement && !!ulElement.children && ulElement.children.lenght > 0) {
      const liChildren = ulElement.children[ulElement.children.length - 1];
      this.element = liChildren.children[0];
      this.elementP = this.renderer.createElement('p');
      this.newIdItem = liChildren.children[0].id;
      this.nextLoad();
    }
  }

  ngOnInit(): void {
    this.modelNews.getPrefs();
    document.addEventListener('closeMenu', (e) => this.scroll());
  }

  ngOnDestroy(): void {
    document.removeEventListener('closeMenu', (e) => this.scroll());
  }

  public scroll(): void {
    this.dom.scrollTop();
    this.showNav = false;
    this.display = false;
    this.showOnboarding = 2;
    const data: any = {};
    data[this.newIdItem] = false;
    this.modelNews.setPrefs(data);

    if (this.element && this.elementP) {
      this.renderer.removeClass(this.elementP, 'blob');
      this.renderer.removeClass(this.elementP, 'orange');
    }
  }

  public redirectHome(): void {
    this.scroll();
  }

  public showPopup(): void {
    if (this.indexEdit <= 0 && this.showOnboarding === 2) {
      this.indexEdit++;
      this.hasPreferences$.pipe(take(1)).subscribe((data) => {
        if (!!data && !!data.data && !!data.data.preferences) {
          this.display = false;
        }
        this.indexEdit++;
      });
    }
  }

  public nextLoad(): void {
    this.display = true;
    this.hasPreferences$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!!data && !!data.data && !!data.data.preferences) {
        // tslint:disable-next-line: prefer-conditional-expression
        if (!!data.data.preferences[this.newIdItem]) {
          this.showOnboarding = !data.data.preferences[this.newIdItem] ? 1 : 2;
        } else {
          this.showOnboarding = 1;
        }
        this.display = false;
        if (this.showOnboarding === 1) {
          this.display = true;
          this.renderer.addClass(this.elementP, 'blob');
          this.renderer.addClass(this.elementP, 'orange');
          this.renderer.appendChild(this.element, this.elementP);
        }
        this.showPopup();
      } else {
        this.display = false;
      }
    });
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get hasPreferences$(): Observable<ILoadPrefs> {
    return this.modelNews.loadPrefs$;
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }
}
