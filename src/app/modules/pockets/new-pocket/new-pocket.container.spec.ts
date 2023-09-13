import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { PocketsModelMock } from '../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';
import { NewPocketContainer } from './new-pocket.container';
import { NewPocketFacade } from './new-pocket.facade';

describe('NewPocketContainer', () => {
  let component: NewPocketContainer;
  let fixture: ComponentFixture<NewPocketContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPocketContainer],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: NewPocketFacade,
          useClass: PocketsModelMock,
        },
        ManipulateDomService,
        ModalService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPocketContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
