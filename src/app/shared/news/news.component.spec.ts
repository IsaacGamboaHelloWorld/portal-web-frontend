import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';
import { NewsModelMock } from '../../../../test-helpers/mocks/models/news.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { NewsComponent } from './news.component';
import { NewsModel } from './store/model/news.model';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [TestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        ManipulateDomService,
        TranslateService,
        {
          provide: NewsModel,
          useClass: NewsModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
