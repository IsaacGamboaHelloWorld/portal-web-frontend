import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FreeDestinationDetailMock } from './../../../../../../../../test-helpers/mocks/data/freeDestinations.mock';

import { CardDetailFreeDestinationComponent } from './card-detail-free-destination.component';

describe('CardDetailFreeDestinationComponent', () => {
  let component: CardDetailFreeDestinationComponent;
  let fixture: ComponentFixture<CardDetailFreeDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CardDetailFreeDestinationComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailFreeDestinationComponent);
    component = fixture.componentInstance;
    component.data = FreeDestinationDetailMock.freeDestinationCredit as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
