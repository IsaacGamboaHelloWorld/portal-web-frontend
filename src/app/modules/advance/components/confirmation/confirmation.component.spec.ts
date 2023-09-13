import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationComponent } from './confirmation.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepService } from '@modules/advance/services/step.service';
import { AdvanceFacadeMock } from '../../../../../../test-helpers/mocks/models/advance.facade.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ConfirmationComponent, RemoveValuePipe],
      providers: [
        StepService,
        ManipulateDomService,
        {
          provide: AdvanceFacade,
          useClass: AdvanceFacadeMock,
        },
        NicknamesService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.edit();
    component.advanceTransfer(null);
    expect(component).toBeTruthy();
  });
});
