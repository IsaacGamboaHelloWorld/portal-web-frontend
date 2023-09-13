import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../test-helpers/testing.module';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ContactComponent],
      providers: [ManipulateDomService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call redirect with parameters', () => {
    const url =
      'https://www.bancopopular.com.co/BuscadordePuntosPopular/?entidad=popular';
    (component as any).link = url;
    const spy = spyOn(window, 'open');
    component.redirect();
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('call select with number event and matches true', () => {
    const event = {
      number: 0,
    };
    const spy = spyOn(window, 'open');
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
    });
    component.select(event);
    expect(spy).toHaveBeenCalledWith(`tel:${event['number']}`, '_system');
  });

  it('call select with empty event', () => {
    const event = {};
    const spy = spyOn(window, 'open');
    component.select(event);
    expect(spy).not.toHaveBeenCalled();
  });
});
