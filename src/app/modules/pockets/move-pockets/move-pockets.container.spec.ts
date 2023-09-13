import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { MovePocketsContainer } from './move-pockets.container';

describe('MovePocketsContainer', () => {
  let component: MovePocketsContainer;
  let fixture: ComponentFixture<MovePocketsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovePocketsContainer],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ManipulateDomService, ModalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePocketsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
