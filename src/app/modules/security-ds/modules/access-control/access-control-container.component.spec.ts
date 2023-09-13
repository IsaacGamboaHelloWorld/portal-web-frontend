import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityModelMock } from '../../../../../../test-helpers/mocks/models/security.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { SecurityModel } from '../../store/model/security.model';

import { AccessControlContainerComponent } from './access-control-container.component';

describe('AccessControlContainerComponent', () => {
  let component: AccessControlContainerComponent;
  let fixture: ComponentFixture<AccessControlContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessControlContainerComponent],
      imports: [TestingModule],
      providers: [
        {
          provide: SecurityModel,
          useClass: SecurityModelMock,
        },
        ManipulateDomService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessControlContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
