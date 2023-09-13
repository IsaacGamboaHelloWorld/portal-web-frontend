import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalComponent } from '@app/shared/modal/modal.component';
import { ActivateTcModelMock } from '../../../../test-helpers/mocks/models/activateTc.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ActivateTcComponent } from './activate-tc.component';
import { ActivateTcModel } from './store/model/activate-tc.model';

describe('ActivateTcComponent', () => {
  let component: ActivateTcComponent;
  let fixture: ComponentFixture<ActivateTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ActivateTcComponent, ModalComponent],
      providers: [
        ManipulateDomService,
        {
          provide: ActivateTcModel,
          useClass: ActivateTcModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ModalComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should openAlert', () => {
    expect(component.openAlert()).toBe();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
