import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { TranslateService } from '@ngx-translate/core';
import { NewsModelMock } from '../../../../../../test-helpers/mocks/models/news.model.mock';
import { WithDrawalMock } from '../../../../../../test-helpers/mocks/models/withdrawal.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { WnocotherMoldel } from '../../wnocother.model';

import { ModalWnocotherComponent } from './modal-wnocother.component';

describe('ModalWnocotherComponent', () => {
  let component: ModalWnocotherComponent;
  let fixture: ComponentFixture<ModalWnocotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWnocotherComponent],
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        TranslateService,
        {
          provide: WnocotherMoldel,
          useClass: WithDrawalMock,
        },
        {
          provide: NewsModel,
          useClass: NewsModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWnocotherComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
