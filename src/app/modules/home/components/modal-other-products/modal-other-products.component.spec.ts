import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { HomeModel } from '@modules/home/home.model';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ModalOtherProductsComponent } from './modal-other-products.component';

describe('ModalOtherProductsComponent', () => {
  let component: ModalOtherProductsComponent;
  let fixture: ComponentFixture<ModalOtherProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ModalOtherProductsComponent],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOtherProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
