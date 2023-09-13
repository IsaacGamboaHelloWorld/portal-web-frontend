import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { environment } from '@environment';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { NavigateDocuments } from '../../entities/routes';
import { HomeModelDocuments } from '../../store/model/home.model';

import { HomeComponent } from './home.component';

describe('HomeComponent in Documents', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HomeModelDocuments,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: PaymentsV2ModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('baseAssets', () => {
    const result = component.baseAssets;
    expect(result).toEqual(environment.resources.base_assets);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigateDocuments);
  });

  it('clickRedirect', () => {
    const facade = TestBed.get(HomeModelDocuments);
    const spy = spyOn(facade, 'notificationOpen');

    component.clickRedirect();

    expect(spy).toHaveBeenCalledWith(
      'PAYMENTSV2.SHARED_COPY.LBL_ALERT',
      true,
      ClassNotification.INFO,
    );
  });

  it('optionsModule$', () => {
    const model = TestBed.get(ApplicationModel);
    const result = component.optionsModule$;
    expect(result).toEqual(model.optionsModule$);
  });
});
