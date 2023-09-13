import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { MovementsLoadingComponent } from './movements-loading.component';

describe('MovementsLoadingComponent', () => {
  let component: MovementsLoadingComponent;
  let fixture: ComponentFixture<MovementsLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MovementsLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsLoadingComponent);
    component = fixture.componentInstance;
    component.movements = {
      loading: true,
      errorMessage: '',
      error: false,
      loaded: false,
      account: null,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('btnClick', () => {
    component.btnClick();
    component.clickBtn.subscribe((data: any) => {
      expect(data).toEqual(undefined);
    });
  });
});
