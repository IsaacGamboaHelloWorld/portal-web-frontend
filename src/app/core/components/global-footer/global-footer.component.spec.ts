import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModel } from '@app/application.model';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { ApplicationModelMock } from '../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { GlobalFooterComponent } from './global-footer.component';

describe('GlobalFooterComponent', () => {
  let component: GlobalFooterComponent;
  let fixture: ComponentFixture<GlobalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [GlobalFooterComponent, RemoveValuePipe],
      providers: [
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
