import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { AdvanceContainer } from 'app/modules/advance/advance.container';
import { AdvanceFacadeMock } from '../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { SecurityService } from '../security/services/security.service';
import { Security } from '../security/utils/security';
import { PreviousRouteService } from './services/previous-route.service';

describe('AdvanceContainer', () => {
  let component: AdvanceContainer;
  let fixture: ComponentFixture<AdvanceContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ModalModule, HttpClientTestingModule],
      declarations: [AdvanceContainer],
      providers: [
        StepService,
        PreviousRouteService,
        ManipulateDomService,
        ModalService,
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },

        SecurityService,
        Security,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceContainer);
    component = fixture.componentInstance;
    spyOn(component, 'initStep').and.callFake(() => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    component.backClicked();
    component.leave();
    expect(component).toBeTruthy();
  });
});
