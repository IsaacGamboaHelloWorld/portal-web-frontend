import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ActivateTcModel } from '../../store/model/activate-tc.model';
import { ModalSuccessComponent } from './modal-success.component';

describe('ModalSuccessComponent', () => {
  let component: ModalSuccessComponent;
  let fixture: ComponentFixture<ModalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuccessComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: ActivateTcModel,
          useClass: ActivateTcModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should doNew', () => {
    expect(component.doNew()).toBe();
  });

  it('should emitClick', () => {
    expect(component.emitClick()).toBe();
  });

  it('should navigate', () => {
    expect(component.navigate.step1).toBe('/activar-tarjeta/crear');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
