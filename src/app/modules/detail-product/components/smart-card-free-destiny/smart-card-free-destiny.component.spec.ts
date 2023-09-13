import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TYPE_STATUS_FREE_DESTINATION } from '@app/core/constants/type_status_free_destination';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { StatusProductPipe } from '../../pipes/status-product/status-product.pipe';

import { SmartCardFreeDestinyComponent } from './smart-card-free-destiny.component';

describe('SmartCardFreeDestinyComponent', () => {
  let component: SmartCardFreeDestinyComponent;
  let fixture: ComponentFixture<SmartCardFreeDestinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        SmartCardFreeDestinyComponent,
        StatusProductPipe,
        RemoveValuePipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCardFreeDestinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isInDue', () => {
    const result = component.isInDue;
    expect(result).toEqual(TYPE_STATUS_FREE_DESTINATION.N);
  });

  it('isInToday', () => {
    const result = component.isInToday;
    expect(result).toEqual(TYPE_STATUS_FREE_DESTINATION.S);
  });
});
