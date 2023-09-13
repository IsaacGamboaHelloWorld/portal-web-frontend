import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCreditCardComponent } from './ds-credit-card.component';

describe('DsCreditCardComponent', () => {
  let component: DsCreditCardComponent;
  let fixture: ComponentFixture<DsCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsCreditCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('actionClick', () => {
    component.actionClick();
    component.actionEvent.subscribe((data: any) => {
      expect(data).toEqual(undefined);
    });
  });
});
