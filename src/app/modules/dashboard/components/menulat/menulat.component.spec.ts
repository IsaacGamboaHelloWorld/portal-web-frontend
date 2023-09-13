import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { environment } from '@environment';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { NewsModelMock } from '../../../../../../test-helpers/mocks/models/news.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { MenulatComponent } from './menulat.component';

describe('MenulatComponent', () => {
  let component: MenulatComponent;
  let fixture: ComponentFixture<MenulatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MenulatComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: NewsModel,
          useClass: NewsModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.scroll();
    expect(component).toBeTruthy();
  });

  it('redirectHome', () => {
    const spy = spyOn(component, 'scroll');
    component.redirectHome();
    expect(spy).toHaveBeenCalled();
  });

  it('showPopup for IF', () => {
    component.indexEdit = -1;
    component.showOnboarding = 2;
    component.showPopup();
    expect(component.indexEdit).toEqual(1);
  });

  it('nextLoad for else', () => {
    component.display = true;
    component.nextLoad();
    expect(component.display).toBeFalsy();
  });

  it('hasPreferences$', () => {
    const model = TestBed.get(NewsModel);
    const result = component.hasPreferences$;
    expect(result).toEqual(model.loadPrefs$);
  });

  it('baseAssets', () => {
    const result = component.baseAssets;
    expect(result).toEqual(environment.resources.base_assets);
  });
});
