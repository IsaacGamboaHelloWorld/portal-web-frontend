import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { HomeModel } from '@app/modules/home/home.model';
import { HomeModelMock } from '@root/test-helpers/mocks/models/home.model.mock';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { HomePointsComponent } from '../../shared/home-points/home-points.component';
import { YourPlusModel } from '../../store/models/your-plus.model';

import { StepOneComponent } from './step-one.component';

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepOneComponent, HomePointsComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create StepOneComponent', () => {
    expect(component).toBeTruthy();
  });
  it('hasToPlus$', () => {
    component.hasToPlus$.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
    });
  });

  it('loadHistoricMovements', () => {
    component.isFilter = false;
    component.loadHistoricMovements(
      { minDate: new Date(), maxDate: new Date() },
      true,
    );
    expect(component.isFilter).toBeTruthy();
  });
});
