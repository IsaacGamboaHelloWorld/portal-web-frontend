import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { StatusProductPipe } from './../../../../pipes/status-product/status-product.pipe';

import { HeaderCardFreeDestinyComponent } from './header-card-free-destiny.component';

describe('HeaderCardFreeDestinyComponent', () => {
  let component: HeaderCardFreeDestinyComponent;
  let fixture: ComponentFixture<HeaderCardFreeDestinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HeaderCardFreeDestinyComponent, StatusProductPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCardFreeDestinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
