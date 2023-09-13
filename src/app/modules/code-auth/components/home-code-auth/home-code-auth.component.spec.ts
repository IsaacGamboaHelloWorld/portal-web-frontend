import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CodeAuthService } from '../../services/code-auth.service';
import { CodeAuthModel } from '../../store/model/code-auth.model';

import { HomeCodeAuthComponent } from './home-code-auth.component';

describe('HomeCodeAuthComponent', () => {
  let component: HomeCodeAuthComponent;
  let fixture: ComponentFixture<HomeCodeAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TestingModule,
        HttpClientTestingModule,
      ],
      declarations: [HomeCodeAuthComponent],
      providers: [
        ManipulateDomService,
        CodeAuthService,
        {
          provide: CodeAuthModel,
          useClass: ActivateTcModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCodeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
