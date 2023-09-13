import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { IeVersionComponent } from './ie-version.component';

describe('IeVersionComponent', () => {
  let component: IeVersionComponent;
  let fixture: ComponentFixture<IeVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IeVersionComponent],
      imports: [TestingModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
