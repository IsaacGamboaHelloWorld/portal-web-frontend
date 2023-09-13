import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ModalSuccessComponent } from './modal-success.component';

describe('ModalSuccessComponent in public service', () => {
  let component: ModalSuccessComponent;
  let fixture: ComponentFixture<ModalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuccessComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ModalService, ManipulateDomService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(component as any, '_updateButtons');
    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(10);
    expect(spy).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_updateButtons flow true', () => {
    component.btnCancel = 'CODE_AUTH.MODAL_ALERT.CANCEL';
    (component as any)._updateButtons();
    expect(component.classBtn).toEqual('btn btn-primary');
    expect(component.classBtnCancel).toEqual('btn btn-gray btn-if-green');
  });

  it('_updateButtons flow false', () => {
    component.btnCancel = null;
    (component as any)._updateButtons();
    expect(component.classBtn).toEqual('btn btn-primary btn-if');
    expect(component.classBtnCancel).toEqual('btn btn-gray');
  });

  it('hasTitle', () => {
    const title = 'Hola mundo';
    component.title = title;
    const result = component.hasTitle;
    expect(result).toBeTruthy();
  });

  it('hasDesc', () => {
    const desc = 'Hola mundo';
    component.desc = desc;
    const result = component.hasDesc;
    expect(result).toBeTruthy();
  });

  it('hasImg', () => {
    const img = '/imagen.png';
    component.img = img;
    const result = component.hasImg;
    expect(result).toBeTruthy();
  });

  it('hasBtnCancel', () => {
    const button = 'cancelar';
    component.btnCancel = button;
    const result = component.hasBtnCancel;
    expect(result).toBeTruthy();
  });

  it('hasBtnAgree', () => {
    const button = 'aceptar';
    component.btnAgree = button;
    const result = component.hasBtnAgree;
    expect(result).toBeTruthy();
  });

  it('emitClick', () => {
    component.loading = false;
    component.emitClick();
    expect(component.loading).toBeTruthy();
  });
});
