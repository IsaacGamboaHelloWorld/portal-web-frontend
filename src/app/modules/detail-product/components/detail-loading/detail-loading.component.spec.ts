import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { CurrentAccountMock } from '../../../../../../test-helpers/mocks/data/currentAccount.mock';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DetailLoadingComponent } from './detail-loading.component';

describe('DetailLoadingComponent', () => {
  let component: DetailLoadingComponent;
  let fixture: ComponentFixture<DetailLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DetailLoadingComponent, TypeCreditCardPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLoadingComponent);
    component = fixture.componentInstance;
    component.product = ProductsMock.CURRENT_ACCOUNT[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasData', () => {
    component.data = CurrentAccountMock as any;
    const result = component.hasData;
    expect(result).toBeTruthy();
  });

  it('btnClick', () => {
    component.btnClick();
    component.clickBtn.subscribe((data: any) => {
      expect(data).toEqual(undefined);
    });
  });
});
