import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TealiumUtagService } from '@app/tealium/utag.service';

import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { ProductsMock } from '@root/test-helpers/mocks/data/products.mock';
import { TransferModelMock } from '@root/test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { StepOneComponent } from './step-one.component';

xdescribe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepOneComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        TealiumUtagService,
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    spyOn(component, 'changeOrigin').and.callFake(() => {});
    spyOn(component, 'fetchDestination').and.callFake(() => {});
    spyOn(component, 'submitForm').and.callFake(() => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    component.changeOrigin();
    component.submitForm();
    expect(component).toBeTruthy();
  });

  it('should be validate string return', () => {
    const text = component.loadAmount(
      ProductsMock.DEPOSIT_ACCOUNT[0],
      'hi',
      '123',
      'loading',
    );
    expect(text).toEqual(`- hi 123`);

    const text2 = component.loadAmount(
      ProductsMock.DEPOSIT_ACCOUNT[0],
      'hi',
      undefined,
      'loading',
    );
    expect(text2).toEqual(`- loading...`);

    const text3 = component.loadAmount(
      ProductsMock.CURRENT_ACCOUNT[0],
      'hi',
      undefined,
      'loading',
    );
    expect(text3).toEqual('');
  });

  it('should be validate trackByFn return id', () => {
    const product = ProductsMock.DEPOSIT_ACCOUNT[0];
    expect(component.trackByFn(1, product)).toEqual(product.id);
  });

  it('should be validate compareFnBanks return boolean', () => {
    const value1 = {
      value: 1,
    };
    const value2 = {
      value: 2,
    };
    expect(component.compareFnBanks(value1, value2)).toBeFalsy();
    expect(component.compareFnBanks(value1, value1)).toBeTruthy();
    expect(component.compareFnBanks(null, value2)).toBeFalsy();
  });

  it('should be validate compareFnOrigin return boolean', () => {
    const value1 = {
      id: 1,
    };
    const value2 = {
      id: 2,
    };
    expect(component.compareFnOrigin(value1, value2)).toBeFalsy();
    expect(component.compareFnOrigin(value1, value1)).toBeTruthy();
    expect(component.compareFnOrigin(null, value2)).toBeFalsy();
  });

  it('should be validate compareFnDestination return boolean', () => {
    expect(component.compareFnDestination(null, undefined)).toBeFalsy();
  });
});
