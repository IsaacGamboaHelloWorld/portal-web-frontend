import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { HistoricStatusComponent } from './historic-status.component';

describe('HistoricStatusComponent', () => {
  let component: HistoricStatusComponent;
  let fixture: ComponentFixture<HistoricStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HistoricStatusComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emptyHistoric is false', () => {
    component.historic = {
      loaded: false,
    } as any;
    const result = component.emptyHistoric;
    expect(result).toBeFalsy();
  });

  it('hasErrorText is false', () => {
    component.historic = {
      errorMessage: '',
    } as any;
    const result = component.hasErrorText;
    expect(result).toBeFalsy();
  });

  it('hasErrorText is true', () => {
    component.historic = {
      errorMessage: 'errorMessage',
    } as any;
    const result = component.hasErrorText;
    expect(result).toBeTruthy();
  });

  it('btnClick', () => {
    component.clickBtn.subscribe((data: any) => {
      expect(data).toBeUndefined();
    });
    component.btnClick();
  });
});
