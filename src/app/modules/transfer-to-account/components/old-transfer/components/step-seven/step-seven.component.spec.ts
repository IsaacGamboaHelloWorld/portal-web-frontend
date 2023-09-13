import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { TransferModelMock } from '@root/test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { StepSevenComponent } from './step-seven.component';

xdescribe('StepSevenComponent', () => {
  let component: StepSevenComponent;
  let fixture: ComponentFixture<StepSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepSevenComponent, RemoveValuePipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
