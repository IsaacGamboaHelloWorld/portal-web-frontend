import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ActivateTcModelMock } from '../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { CodeAuthComponent } from './code-auth.component';
import { CodeAuthModel } from './store/model/code-auth.model';

describe('CodeAuthComponent', () => {
  let component: CodeAuthComponent;
  let fixture: ComponentFixture<CodeAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CodeAuthComponent],
      providers: [
        ManipulateDomService,
        {
          provide: CodeAuthModel,
          useClass: ActivateTcModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAuthComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
