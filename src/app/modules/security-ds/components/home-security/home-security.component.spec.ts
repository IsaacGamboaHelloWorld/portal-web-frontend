import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { NavigateOptionEnum } from '@app/core/constants/navigate-option-enum';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';
import { responseOptionsModuleMock } from '@root/test-helpers/mocks/data/options-modules.mock';
import { homeOptionsMock } from '@root/test-helpers/mocks/data/security.mock';
import { ApplicationModelMock } from '@root/test-helpers/mocks/models/application.model.mock';
import { LimitManagementModelMock } from '@root/test-helpers/mocks/models/limit-management.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { LimitManagementModel } from '../../modules/limit-management/store';
import { HomeSecurityComponent } from './home-security.component';

describe('HomeSecurityComponent', () => {
  let component: HomeSecurityComponent;
  let fixture: ComponentFixture<HomeSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSecurityComponent],
      imports: [TestingModule],
      providers: [
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: LimitManagementModel,
          useClass: LimitManagementModelMock,
        },
        ManipulateDomService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSecurityComponent);
    component = fixture.componentInstance;

    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(homeOptionsMock);
    component.options = homeOptionsMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    component.options = homeOptionsMock;
    expect(component).toBeTruthy();
  });

  it('showOption with options', () => {
    const options = responseOptionsModuleMock.data.security.options;
    const title = NavigateOptionEnum.SECURITY_DATA;

    const result = component.showOption(options, title);

    expect(result).toBeTruthy();
  });

  it('showOption without options', () => {
    const options = null;
    const title = NavigateOptionEnum.SECURITY_DATA;

    const result = component.showOption(options, title);

    expect(result).toBeUndefined();
  });
});
