import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductPfmMock } from '@root/test-helpers/mocks/models/detail-product-pfm.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { DetailProductPFMModel } from '../../detail-product-pfm.model';

import { RecategorizationComponent } from './recategorization.component';

describe('RecategorizationComponent', () => {
  let component: RecategorizationComponent;
  let fixture: ComponentFixture<RecategorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecategorizationComponent],
      imports: [TestingModule],
      providers: [
        ManipulateDomService,
        {
          provide: DetailProductPFMModel,
          useClass: DetailProductPfmMock,
        },
        ChangeDetectorRef,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
