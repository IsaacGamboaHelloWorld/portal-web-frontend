import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../core/pipes/remove-value.pipe';
import { ServiceToPayComponent } from './service-to-pay.component';

describe('ServiceToPayComponent', () => {
  let component: ServiceToPayComponent;
  let fixture: ComponentFixture<ServiceToPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ServiceToPayComponent, RemoveValuePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
