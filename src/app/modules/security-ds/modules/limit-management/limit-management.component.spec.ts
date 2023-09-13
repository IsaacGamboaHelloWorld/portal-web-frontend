import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LimitManagementModelMock } from '@root/test-helpers/mocks/models/limit-management.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';

import { LimitManagementComponent } from './limit-management.component';
import { LimitManagementModel } from './store';

describe('LimitManagementComponent', () => {
  let component: LimitManagementComponent;
  let fixture: ComponentFixture<LimitManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [LimitManagementComponent],
      providers: [
        {
          provide: LimitManagementModel,
          useClass: LimitManagementModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
