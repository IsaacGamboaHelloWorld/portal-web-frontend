import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CodeAuthService } from '../../services/code-auth.service';
import { CodeAuthModel } from '../../store/model/code-auth.model';

import { ModalCodeAuthComponent } from './modal-code-auth.component';

describe('ModalCodeAuthComponent', () => {
  let component: ModalCodeAuthComponent;
  let fixture: ComponentFixture<ModalCodeAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ModalCodeAuthComponent],
      providers: [
        ManipulateDomService,
        CodeAuthService,
        {
          provide: CodeAuthModel,
          useClass: ActivateTcModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCodeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
