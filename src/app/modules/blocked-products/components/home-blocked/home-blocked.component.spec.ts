import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';
import { BlockProductsModelMock } from '../../store/model/mock/block-products.model.mock';
import { HomeBlockedComponent } from './home-blocked.component';

describe('HomeBlockedComponent', () => {
  let component: HomeBlockedComponent;
  let fixture: ComponentFixture<HomeBlockedComponent>;
  let modelMock: BlockProductsModelMock;

  beforeEach(async(() => {
    modelMock = new BlockProductsModelMock();
    TestBed.configureTestingModule({
      declarations: [HomeBlockedComponent],
      imports: [TestingModule],
      providers: [
        {
          provide: BlockedProductsModel,
          useValue: modelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeSelectedType', () => {
    const type = 'CARDS';
    component.changeSelectedType(type);
    expect(component.typeSelected).toEqual(type);
  });

  it('retryLoadDebitCardList', () => {
    component.loading = false;
    component.retryLoadDebitCardList();
    expect(component.loading).toBeTruthy();
  });
});
