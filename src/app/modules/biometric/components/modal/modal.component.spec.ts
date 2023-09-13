import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { DialogConfigMock } from '../../../../../../test-helpers/mocks/models/dialog-popup-block.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ModalComponent],
      providers: [
        WebAuthnService,
        ManipulateDomService,
        {
          provide: DialogConfig,
          useClass: DialogConfigMock,
        },
        { provide: ApplicationModel, useClass: ApplicationModelMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
