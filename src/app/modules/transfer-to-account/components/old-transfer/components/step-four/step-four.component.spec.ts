import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { TealiumUtagService } from '@app/tealium/utag.service';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { TransferModelMock } from '@root/test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { StepFourComponent } from './step-four.component';

xdescribe('StepFourComponent', () => {
  let component: StepFourComponent;
  let fixture: ComponentFixture<StepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepFourComponent, RemoveValuePipe],
      imports: [TestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        TealiumUtagService,
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
        ManipulateDomService,
        NicknamesService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFourComponent);
    component = fixture.componentInstance;
    spyOnProperty(component, 'isNew$', 'get').and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'submitData').and.callFake(() => {});
    expect(component).toBeTruthy();
  });
});
