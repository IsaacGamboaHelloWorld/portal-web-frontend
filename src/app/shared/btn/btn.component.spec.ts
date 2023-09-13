import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BtnComponent } from './btn.component';

describe('BtnComponent', () => {
  let component: BtnComponent;
  let fixture: ComponentFixture<BtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BtnComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnComponent);
    component = fixture.componentInstance;
    component.id = 'btn-login';
    component.text = 'Ingresar';
    component.type = 'submit';
    fixture.detectChanges();
  });

  it('should create', () => {
    component.btnClick();
    expect(component).toBeTruthy();

    expect(fixture.debugElement.query(By.css('.btn')).nativeElement.id).toBe(
      'btn-login',
    );

    expect(
      fixture.debugElement.query(By.css('.btn')).nativeElement.textContent,
    ).toContain('Ingresar');
  });
});
