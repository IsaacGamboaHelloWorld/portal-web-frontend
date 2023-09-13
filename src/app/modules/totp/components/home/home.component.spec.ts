import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TotpModelMock } from '../../../../../../test-helpers/mocks/models/totp.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { TotpModel } from '../../store/models/totp.model';

import { HomeComponent } from './home.component';

describe('HomeComponent in TOTP', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TestingModule],
      providers: [
        ManipulateDomService,
        {
          provide: TotpModel,
          useClass: TotpModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
