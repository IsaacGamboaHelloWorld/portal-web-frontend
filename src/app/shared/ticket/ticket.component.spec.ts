import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TestingModule } from './../../../../test-helpers/testing.module';
import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [TicketComponent, RemoveValuePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    component.btnText = 'Example';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate show btn and click', () => {
    setTimeout(() => {
      expect(
        fixture.debugElement.query(By.css('.container-ticket-left button'))
          .nativeElement,
      ).toBeDefined();
    }, 100);
  });
});
