import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { PocketsModelMock } from '../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';
import { EditPocketContainer } from './edit-pocket.container';
import { EditPocketFacade } from './edit-pocket.facade';

describe('EditPocketComponent', () => {
  let component: EditPocketContainer;
  let fixture: ComponentFixture<EditPocketContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPocketContainer],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: EditPocketFacade,
          useClass: PocketsModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPocketContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
