import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ProductsMock } from './../../../../test-helpers/mocks/data/products.mock';

import { CardAccountRadiusComponent } from './card-account-radius.component';

describe('CardAccountRadiusComponent', () => {
  let component: CardAccountRadiusComponent;
  let fixture: ComponentFixture<CardAccountRadiusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CardAccountRadiusComponent, TypeCreditCardPipe],
      providers: [ManipulateDomService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAccountRadiusComponent);
    component = fixture.componentInstance;
    component.data = ProductsMock.CREDIT[0];
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

    const spyIndex = spyOn(component as any, '_setIndex');

    component.setClass(index);

    expect(spyRemove).toHaveBeenCalledWith('.card-container-arb', 'active');
    expect(spyAdd).toHaveBeenCalledWith(`.type-arb-${index}`, 'active');
    expect(spyIndex).toHaveBeenCalledWith(index);
  });

  it('_setIndex', () => {
    const index = 1;
    component.property = 'property';
    component.form = new FormGroup({
      property: new FormControl(''),
    });

    (component as any)._setIndex(index);

    component.setCardEmit.subscribe((data: any) => {
      expect(data).toEqual(index);
    });
  });
});
