import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { Navigate } from '@app/core/constants/navigate';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { homeOptionsMock } from '../../../../../../test-helpers/mocks/data/security.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from './../../../../../../test-helpers/testing.module';

import { CardHomeOptionsComponent } from './card-home-options.component';

describe('CardHomeOptionsComponent', () => {
  let component: CardHomeOptionsComponent;
  let fixture: ComponentFixture<CardHomeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardHomeOptionsComponent],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        WebAuthnService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect without data', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.redirect();

    expect(spy).not.toHaveBeenCalled();
  });

  it('redirect with data', () => {
    component.data = homeOptionsMock[2];

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.redirect();

    expect(spy).toHaveBeenCalled();
  });

  it('redirect when path is null', () => {
    component.data = homeOptionsMock[0];

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.redirect();

    expect(spy).not.toHaveBeenCalled();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });
});
