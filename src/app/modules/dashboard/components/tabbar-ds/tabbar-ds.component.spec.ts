import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockRouter } from '../../../../../../test-helpers/mocks/core-angular/router.mock';
import { TestingModule } from './../../../../../../test-helpers/testing.module';
import { VariableValuePipe } from './../../../../core/pipes/variable-value/variable-value.pipe';

import { TabbarDsComponent } from './tabbar-ds.component';

describe('TabbarDsComponent', () => {
  let component: TabbarDsComponent;
  let fixture: ComponentFixture<TabbarDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TabbarDsComponent, VariableValuePipe],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbarDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect', () => {
    const item = {
      name: 'TABBAR.ITEM_THREE',
      icon: 'icon-ds-products',
      url: '/',
    };
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.redirect(item);

    expect(component.urlActive).toEqual(item.url);
    expect(spy).toHaveBeenCalledWith([item.url]);
  });
});
