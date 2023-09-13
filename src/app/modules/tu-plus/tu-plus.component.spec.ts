import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ApplicationModelMock } from '@root/test-helpers/mocks/models/application.model.mock';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { YourPlusService } from './services/your-plus.service';
import { YourPlusModel } from './store/models/your-plus.model';

import { TuPlusComponent } from './tu-plus.component';

describe('TuPlusComponent', () => {
  let component: TuPlusComponent;
  let fixture: ComponentFixture<TuPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TuPlusComponent],
      imports: [TestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        YourPlusService,
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TuPlusComponent', () => {
    expect(component).toBeTruthy();
  });

  it('backHome if event', () => {
    const home = '/';
    component.backUrl = home;
    (component as any).backHome(true);
  });
  it('backHome if no event', () => {
    const spy = spyOn(component as any, 'validateSteps');
    (component as any).backHome(false);
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
