import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { HomePocketsContainer } from '@modules/pockets/home-pockets/home-pockets.container';
import { HomePocketsFacade } from '@modules/pockets/home-pockets/home-pockets.facade';
import { PocketsModelMock } from '../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '../../security/services/security.service';
import { Security } from '../../security/utils/security';
describe('HomePocketsComponent', () => {
  let component: HomePocketsContainer;
  let fixture: ComponentFixture<HomePocketsContainer>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePocketsContainer],
      imports: [TestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: HomePocketsFacade,
          useClass: PocketsModelMock,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(inject([HomePocketsFacade], (bla: HomePocketsFacade) => {
    bla.activeProduct$ = PocketsModelMock.activeProduct$;
    bla.homePockets$ = PocketsModelMock.homePockets$;
    fixture = TestBed.createComponent(HomePocketsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
