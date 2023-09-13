import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from './../../../../test-helpers/testing.module';

import { SecurityDsContainerComponent } from './security-ds-container.component';

describe('SecurityDsContainerComponent', () => {
  let component: SecurityDsContainerComponent;
  let fixture: ComponentFixture<SecurityDsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityDsContainerComponent],
      imports: [TestingModule],
      providers: [ManipulateDomService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
