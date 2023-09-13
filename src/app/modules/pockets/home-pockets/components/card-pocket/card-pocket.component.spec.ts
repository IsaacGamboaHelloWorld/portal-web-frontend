import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { HomePocketsFacade } from '../../home-pockets.facade';
import { CardPocketComponent } from './card-pocket.component';

const pocketData = {
  pocketId: '',
  pocketType: '',
  pocketName: '',
  savingGoal: '',
  amountPeriodicSavings: '',
  amountSaved: '',
  pendingAmount: '',
  category: '',
};

describe('CardPocketComponent', () => {
  let component: CardPocketComponent;
  let fixture: ComponentFixture<CardPocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [CardPocketComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: HomePocketsFacade,
          useClass: PocketsModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPocketComponent);
    component = fixture.componentInstance;
    // component.cardInfo = pocketData;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
