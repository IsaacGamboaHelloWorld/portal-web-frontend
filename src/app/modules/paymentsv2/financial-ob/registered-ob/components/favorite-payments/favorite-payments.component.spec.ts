import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { FavoritePaymentsComponent } from './favorite-payments.component';

describe('FavoritePaymentsComponent', () => {
  let component: FavoritePaymentsComponent;
  let fixture: ComponentFixture<FavoritePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CheckboxSlideModule],
      declarations: [FavoritePaymentsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeStatus', () => {
    component.stateCheck.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
    });
    component.changeStatus(true);
  });
});
