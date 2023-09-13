import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { TestingModule } from '@root/test-helpers/testing.module';

import { ObfuscateNumberComponent } from './obfuscate-number.component';

describe('ObfuscateNumberComponent', () => {
  let component: ObfuscateNumberComponent;
  let fixture: ComponentFixture<ObfuscateNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObfuscateNumberComponent, CreditCardHiddenPipe],
      imports: [TestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObfuscateNumberComponent);
    component = fixture.componentInstance;
    component.obfuscate = false;
    component.accountNumber = '4506589940263513';
    fixture.detectChanges();
  });

  it('should create', () => {
    component.obfuscate = false;
    component.accountNumber = '4506589940263513';
    expect(component).toBeTruthy();
  });
});
