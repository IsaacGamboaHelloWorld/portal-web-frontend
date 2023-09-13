import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { BtnComponent } from '@app/shared/btn/btn.component';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { NavigateYourPlus } from '../../constants/routes';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { HomePointsComponent } from './home-points.component';

describe('HomePointsComponent', () => {
  let component: HomePointsComponent;
  let fixture: ComponentFixture<HomePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePointsComponent, RemoveValuePipe],
      imports: [TestingModule],
      providers: [
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        BtnComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HomePointsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigateYourPlus);
  });

  it('goToHow', () => {
    const spy_setStep = spyOn(component as any, '_setStep');
    (component as any).goToHow();
    expect(spy_setStep).toHaveBeenCalled();
  });
});
