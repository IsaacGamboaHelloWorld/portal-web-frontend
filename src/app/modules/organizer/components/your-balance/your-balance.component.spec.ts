import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeModel } from '@app/modules/home/home.model';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { HomeModelMock } from '@root/test-helpers/mocks/models/home.model.mock';
import { PocketsModelMock } from '@root/test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';

import { YourBalanceComponent } from './your-balance.component';

describe('YourBalanceComponent', () => {
  let component: YourBalanceComponent;
  let fixture: ComponentFixture<YourBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [YourBalanceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HomePocketsFacade,
          useClass: PocketsModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
