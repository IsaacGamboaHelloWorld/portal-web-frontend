import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { billersRegisteredMock } from '../../../../../../test-helpers/mocks/data/payments-sp.mock';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProgrammedPaymentComponent } from './programmed-payment.component';

describe('ProgrammedPaymentComponent', () => {
  let component: ProgrammedPaymentComponent;
  let fixture: ComponentFixture<ProgrammedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ProgrammedPaymentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeStatus', () => {
    const data = false;
    jasmine.clock().install();
    component.changeStatus(data);
    jasmine.clock().tick(10);
    expect(component.actived).toBeFalsy();
    jasmine.clock().uninstall();
  });

  it('edit', () => {
    const data = billersRegisteredMock.billers[0] as any;
    component.data = data;

    component.edit();
    const dataToEdit = {
      action: 'EDIT',
      data,
    };

    component.editAction.subscribe((_data: any) => {
      expect(JSON.stringify(_data)).toEqual(JSON.stringify(dataToEdit));
    });
  });
});
