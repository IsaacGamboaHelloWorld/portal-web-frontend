import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { CdtMovementComponent } from './cdt-movement.component';

describe('CdtMovementComponent', () => {
  let component: CdtMovementComponent;
  let fixture: ComponentFixture<CdtMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CdtMovementComponent, RemoveValuePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
