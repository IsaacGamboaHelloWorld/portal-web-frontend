import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { CardHomeOptionsComponent } from './card-home-options.component';

describe('CardHomeOptionsComponent in Access Control', () => {
  let component: CardHomeOptionsComponent;
  let fixture: ComponentFixture<CardHomeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardHomeOptionsComponent, RemoveValuePipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.lastSession = '2018-02-16T17:00:00Z';
    expect(component).toBeTruthy();
  });

  it('changeStatus', () => {
    component.stateFront = true;
    component.changeStatus(component.stateFront);
    component.stateEmit.subscribe((data: any) => {
      expect(data).toBeTruthy();
    });
  });

  it('get state', () => {
    (component as any)._state = false;
    const result = component.state;
    expect(result).toBeFalsy();
  });

  it('set state', () => {
    component.state = true;
    const state = (component as any)._state;
    expect(state).toBeTruthy();
  });
});
