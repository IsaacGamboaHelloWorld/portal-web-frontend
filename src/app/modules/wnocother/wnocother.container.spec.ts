import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { NewsModelMock } from '../../../../test-helpers/mocks/models/news.model.mock';
import { WithDrawalMock } from '../../../../test-helpers/mocks/models/withdrawal.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '../security/services/security.service';
import { Security } from '../security/utils/security';
import { WnocotherContainer } from './wnocother.container';
import { WnocotherMoldel } from './wnocother.model';

describe('WnocotherComponent', () => {
  let component: WnocotherContainer;
  let fixture: ComponentFixture<WnocotherContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [WnocotherContainer],
      providers: [
        SecurityService,
        Security,
        ManipulateDomService,
        {
          provide: WnocotherMoldel,
          useClass: WithDrawalMock,
        },
        {
          provide: NewsModel,
          useClass: NewsModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WnocotherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
