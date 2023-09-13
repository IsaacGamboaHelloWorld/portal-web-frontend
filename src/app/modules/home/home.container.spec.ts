import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { KeysPipe } from '@core/pipes/keys/keys.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { HomeModel } from '@modules/home/home.model';
import { OrderProductsPipe } from '@modules/home/pipes/order-products.pipe';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { responseOptionsModuleMock } from '../../../../test-helpers/mocks/data/options-modules.mock';
import { ProductsMock } from '../../../../test-helpers/mocks/data/products.mock';
import { HomeModelMock } from '../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ModalProductActionsComponent } from './components/modal-product-actions/modal-product-actions.component';
import { HomeContainer } from './home.container';

describe('HomeContainer', () => {
  let component: HomeContainer;
  let fixture: ComponentFixture<HomeContainer>;
  let model: HomeModel;
  let modelMock: HomeModelMock;

  beforeEach(async(() => {
    modelMock = new HomeModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HomeContainer, KeysPipe, OrderProductsPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        ModalService,
        TranslateService,
        {
          provide: HomeModel,
          useValue: modelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContainer);
    model = TestBed.get(HomeModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be validate get', () => {
    component.loadOtherProducts(true);
    component.name$.subscribe((data) => expect(data).toEqual(''));
    component.infoProducts$.subscribe((data) => expect(data).toBeDefined());
    component.otherProducts$.subscribe((data) =>
      expect(data.length).toEqual(0),
    );
  });

  it('call openActions and check open modal with inputs parameters and call _actionsModals', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    const params = {} as any;

    const spyAction = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();
    component.openActions(params);

    expect(spyModal).toHaveBeenCalledWith(
      ModalProductActionsComponent,
      true,
      STANDARD_WIDTH,
      true,
      params,
    );

    jasmine.clock().tick(10);

    expect(spyAction).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal should be call modal.close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const data = {
      instance: {
        componentRef: {
          instance: {
            actionCancel: of(''),
          },
        },
      },
    };

    modal._dialogComponentRef = data;
    (component as any)._actionsModal();

    expect(spyClose).toHaveBeenCalled();
  });

  it('_actionsModal should be not call modal.close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    modal._dialogComponentRef = null;
    (component as any)._actionsModal();

    expect(spyClose).not.toHaveBeenCalled();
  });

  it('stocksPeriod$', () => {
    const result = component.stocksPeriod$;
    expect(result).toEqual(model.stocksPeriod$);
  });

  it('stocksTypes$', () => {
    const result = component.stocksTypes$;
    expect(result).toEqual(model.stocksType$);
  });

  it('loadOtherBank', () => {
    const name = 'jeff';
    const spy = spyOn(model, 'loadOtherBank');
    component.loadOtherBank(name);
    expect(spy).toHaveBeenCalledWith(name);
  });

  it('hasOffers', () => {
    component.offersProducts = [
      { img: '', name: '', title: '', desc: '', btn: '' },
    ];
    const result = component.hasOffers;
    expect(result).toBeTruthy();
  });

  it('hasName should be return true', () => {
    const userState: UserSecureDataMdmState = {
      data: {
        success: true,
        PartyAssociation: [
          {
            PersonInfo: {
              PersonName: [
                {
                  FirstName: 'jeff',
                  LastName: 'marti',
                },
              ],
            },
          },
        ],
      } as any,
      loading: false,
      loaded: true,
      error: false,
    };

    const result = component.hasName(userState);
    expect(result).toBeTruthy();
  });

  it('freeDestiny$', () => {
    const result = component.freeDestiny$;
    expect(result).toEqual(model.freeDestiny$);
  });

  it('freeDestinations$', () => {
    const result = component.freeDestinations$;
    expect(result).toEqual(model.freeDestinations$);
  });

  it('_mapProductsCombine for current_account', () => {
    const product = ProductsMock;
    const options = {
      products: {
        options: {
          current_account: true,
        },
      },
    };
    const resultExpect = {
      CURRENT_ACCOUNT: [...product.CURRENT_ACCOUNT],
      CREDIT: [],
      DEPOSIT_ACCOUNT: [],
      CERTIFIED_DEPOSIT_TERM: [],
      CREDIT_CARD: [],
    };
    const result = (component as any)._mapProductsCombine(product, options);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(resultExpect));
  });

  it('_mapProductsCombine for credit', () => {
    const product = ProductsMock;
    const options = {
      products: {
        options: {
          credit: true,
        },
      },
    };
    const resultExpect = {
      CURRENT_ACCOUNT: [],
      CREDIT: [...product.CREDIT],
      DEPOSIT_ACCOUNT: [],
      CERTIFIED_DEPOSIT_TERM: [],
      CREDIT_CARD: [],
    };
    const result = (component as any)._mapProductsCombine(product, options);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(resultExpect));
  });

  it('_mapProductsCombine for deposit_account', () => {
    const product = ProductsMock;
    const options = {
      products: {
        options: {
          deposit_account: true,
        },
      },
    };
    const resultExpect = {
      CURRENT_ACCOUNT: [],
      CREDIT: [],
      DEPOSIT_ACCOUNT: [...product.DEPOSIT_ACCOUNT],
      CERTIFIED_DEPOSIT_TERM: [],
      CREDIT_CARD: [],
    };
    const result = (component as any)._mapProductsCombine(product, options);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(resultExpect));
  });

  it('_mapProductsCombine for cdt', () => {
    const product = ProductsMock;
    const options = {
      products: {
        options: {
          cdt: true,
        },
      },
    };
    const resultExpect = {
      CURRENT_ACCOUNT: [],
      CREDIT: [],
      DEPOSIT_ACCOUNT: [],
      CERTIFIED_DEPOSIT_TERM: [...product.CERTIFIED_DEPOSIT_TERM],
      CREDIT_CARD: [],
    };
    const result = (component as any)._mapProductsCombine(product, options);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(resultExpect));
  });

  it('_mapProductsCombine for credit_card', () => {
    const product = ProductsMock;
    const options = {
      products: {
        options: {
          credit_card: true,
        },
      },
    };
    const resultExpect = {
      CURRENT_ACCOUNT: [],
      CREDIT: [],
      DEPOSIT_ACCOUNT: [],
      CERTIFIED_DEPOSIT_TERM: [],
      CREDIT_CARD: [...product.CREDIT_CARD],
    };
    const result = (component as any)._mapProductsCombine(product, options);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(resultExpect));
  });

  it('identify', () => {
    const index = 0;
    const item = {
      key: 'DESPOSIT_ACCOUNT',
    };
    const result = component.identify(index, item);
    expect(result).toEqual(item.key);
  });

  it('toPlus$', () => {
    const result = component.toPlus$;
    expect(result).toEqual(model.toPlus$);
  });

  it('hasToPlus$', () => {
    component.hasToPlus$.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
    });
  });

  it('hasActions$', () => {
    component.hasActions$.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
    });
  });

  it('products$ for if', () => {
    spyOn(model, 'products$').and.returnValue(of(ProductsMock));
    spyOn(model, 'optionModule$').and.returnValue(
      of(responseOptionsModuleMock),
    );
    component.products$.subscribe((products: ProductsInterface) => {
      expect(JSON.stringify(ProductsMock)).toEqual(JSON.stringify(products));
    });
  });

  it('products$ for else', () => {
    const mock = {
      ...responseOptionsModuleMock,
      success: false,
    };
    modelMock.setInnerOptionModule = mock;
    modelMock.setInnerProduct = null;
    component.products$.subscribe((products: ProductsInterface) => {
      expect(products).toEqual(null);
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
