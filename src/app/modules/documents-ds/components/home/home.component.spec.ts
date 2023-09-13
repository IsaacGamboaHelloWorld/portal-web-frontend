import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { NavigateDocuments } from '@app/modules/documents/entities/routes';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { NavigateDocumentsDs } from '../../constants/navigate-documents-ds';
import { UtilsDocumentsService } from '../../services/utils-documents.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        UtilsDocumentsService,
        ManipulateDomService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
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

  it('optionsModule$', () => {
    const model = TestBed.get(ApplicationModel);
    const result = component.optionsModule$;
    expect(result).toEqual(model.optionsModule$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigateDocuments);
  });

  it('navigateDocuments', () => {
    const result = component.navigateDocuments;
    expect(result).toEqual(NavigateDocumentsDs);
  });
});
