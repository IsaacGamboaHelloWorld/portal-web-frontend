import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TranslateModule } from '@ngx-translate/core';
import { TestingModule } from './../../../../../../../test-helpers/testing.module';

import { DsModalComponent } from './ds-modal.component';

describe('DsModalComponent', () => {
  let component: DsModalComponent;
  let fixture: ComponentFixture<DsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsModalComponent],
      imports: [BtnModule, TranslateModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
