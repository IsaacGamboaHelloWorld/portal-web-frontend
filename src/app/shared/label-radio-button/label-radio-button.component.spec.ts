import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';

import { LabelRadioButtonComponent } from './label-radio-button.component';

describe('LabelRadioButtonComponent', () => {
  let component: LabelRadioButtonComponent;
  let fixture: ComponentFixture<LabelRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelRadioButtonComponent],
      providers: [ManipulateDomService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get isActive', () => {
    component.isActive = true;
    const result = component.isActive;
    expect(result).toBeTruthy();
  });

  it('set isActive for true', () => {
    component.isActive = true;
    expect(component.isActive).toBeTruthy();
  });

  it('set isActive for false', () => {
    component.isActive = false;
    const spy = spyOn(component, 'setClass');
    expect(component.isActive).toBeFalsy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('setClass', () => {
    const index = 1;
    component.index = index;

    const dom = TestBed.get(ManipulateDomService);

    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass();

    component.checkEvent.subscribe((data: any) => {
      expect(data).toEqual(index);
    });

    expect(spyRemove).toHaveBeenCalledWith(
      '[class^="type-lbr-"]',
      'active-lbr',
    );
    expect(spyAdd).toHaveBeenCalledWith(`.type-lbr-${index}`, 'active-lbr');
  });
});
