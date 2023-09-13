import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NewsModel } from './store/model/news.model';
import { ILoadPrefs } from './store/reducers/news.reducers';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit {
  @Input() append: any;
  public display: boolean = null;
  public numberSlide: number = 0;
  public dataSlide: object = { label: '', text: '' };
  public mapData: object[] = [];
  public loadingItems: number = 3;
  public slideImg: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public showOnboarding: number = 0;
  public indexEdit: number = 0;
  public textButton: string;
  public viewSkip: boolean = true;
  @ViewChild('infoSlide', null) infoSlide: ElementRef;
  @ViewChild('imgSlide', null) imgSlide: ElementRef;
  constructor(
    private translate: TranslateService,
    private render: Renderer2,
    private model: NewsModel,
  ) {}
  get slide$(): Observable<object[]> {
    return this.translate.get('MODAL_NEWS.SLIDE');
  }

  public showPopup(): void {
    if (this.indexEdit <= 0 && this.showOnboarding === 2) {
      this.indexEdit++;
      this.hasPreferences$.pipe(take(1)).subscribe((data) => {
        if (
          !!data &&
          !!data.data &&
          !!data.data.preferences &&
          !data.data.preferences.newsOnBoarding1
        ) {
          this.display = false;
        }
        this.indexEdit++;
      });
    }
  }

  public nextLoad(): void {
    this.hasPreferences$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!!data && !!data.data && !!data.data.preferences) {
        if (!!data.data.preferences.firstTimeDocuments) {
          this.showOnboarding = !data.data.preferences.firstTimeDocuments
            ? 1
            : 2;
        } else {
          this.showOnboarding = 1;
        }
        this.display = this.showOnboarding === 1 ? true : false;
        this.showPopup();
      }
    });
  }

  ngOnInit(): void {
    this.model.getPrefs();
    this.nextLoad();
    this.mapData = [];
    this.slide$.subscribe((data: object[]) => {
      data =
        typeof data === 'object'
          ? data.filter((e, i) => i === data.length - 1)
          : data;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          this.mapData.push(element);
          if (this.numberSlide === parseInt(key, null)) {
            this.render.addClass(this.infoSlide.nativeElement, 'fade-in-right');
            this.dataSlide['label'] = data[key]['TITLE'];
            this.setText(parseInt(key, null));
          }
        }
      }
    });
    this.textButton =
      this.mapData.length === 1
        ? 'MODAL_NEWS.BUTTONS.OK'
        : 'MODAL_NEWS.BUTTONS.NEXT';
    this.slideImg =
      this.mapData.length === 1 ? '/slide_modal5.png' : '/slide_modal1.png';
  }
  public skip(): void {
    this.display = false;
    this.showOnboarding = 2;
    const data: any = {
      firstTimeDocuments: false,
    };
    this.model.setPrefs(data);
  }

  public setText(slide: number): void {
    this.mapData.forEach((e, i) => {
      if (slide === i) {
        const text = String(e['TEXT']);
        this.slideImg =
          this.mapData.length === 1
            ? `/slide_modal5.png`
            : `/slide_modal${i + 1}.png`;
        this.dataSlide['label'] = e['TITLE'];
        this.dataSlide['text'] =
          text.indexOf('><') > 0
            ? `${text.split('><')[0]}>${e['BOLD_TEXT']}<${text.split('><')[1]}`
            : text;
      }
    });
  }

  public toggle(event?: string): void {
    this.render.removeClass(this.infoSlide.nativeElement, 'fade-in-right');
    this.render.removeClass(this.imgSlide.nativeElement, 'fade-in-right');
    this.render.removeClass(this.infoSlide.nativeElement, 'fade-in-left');
    this.render.removeClass(this.imgSlide.nativeElement, 'fade-in-left');
    setTimeout(() => {
      this.textButton = 'MODAL_NEWS.BUTTONS.NEXT';
      this.viewSkip = true;
      switch (event) {
        case 'prev':
          this.numberSlide--;
          this.render.addClass(this.infoSlide.nativeElement, 'fade-in-left');
          this.render.addClass(this.imgSlide.nativeElement, 'fade-in-left');
          break;
        case 'next':
          this.numberSlide++;
          this.render.addClass(this.infoSlide.nativeElement, 'fade-in-right');
          this.render.addClass(this.imgSlide.nativeElement, 'fade-in-right');
          break;
        default:
          this.numberSlide = parseInt(event, null);
          break;
      }
      if (
        this.mapData.length > 1 &&
        this.numberSlide === this.mapData.length - 1
      ) {
        this.textButton = 'MODAL_NEWS.BUTTONS.OK';
        this.viewSkip = false;
      }
      this.setText(this.numberSlide);
      if (this.numberSlide === this.mapData.length) {
        this.numberSlide = this.mapData.length - 1;
        this.display = false;
        this.showOnboarding = 2;
        const data: any = {
          firstTimeDocuments: false,
        };
        this.model.setPrefs(data);
      } else if (this.numberSlide < 0) {
        this.numberSlide = 0;
      }
    }, 500);
  }

  get hasPreferences$(): Observable<ILoadPrefs> {
    return this.model.loadPrefs$;
  }
}
