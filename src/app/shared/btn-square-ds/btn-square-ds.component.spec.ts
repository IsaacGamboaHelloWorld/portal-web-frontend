import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestingModule } from './../../../../test-helpers/testing.module';

import { BtnSquareDsComponent } from './btn-square-ds.component';

describe('BtnSquareDsComponent', () => {
  let component: BtnSquareDsComponent;
  let fixture: ComponentFixture<BtnSquareDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BtnSquareDsComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSquareDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect for disabled true', () => {
    component.disabled = true;
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    component.redirect();

    expect(spyNav).not.toHaveBeenCalled();
  });

  it('redirect for disabled false and url value', () => {
    const url = '/';
    component.url = url;
    component.disabled = false;
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    component.redirect();

    expect(spyNav).toHaveBeenCalledWith([url]);
  });

  it('redirect for disabled false and without url value', () => {
    const url = null;
    component.url = url;
    component.disabled = false;
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    component.clickBtn.subscribe((data: any) => {
      expect(data).toBeUndefined();
    });

    component.redirect();

    expect(spyNav).not.toHaveBeenCalled();
  });
});
