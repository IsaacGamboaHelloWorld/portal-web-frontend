import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WithDrawalMock } from '../../../../../../test-helpers/mocks/models/withdrawal.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { WnocotherMoldel } from '../../wnocother.model';
import { CancelWnocotherComponent } from './cancel-wnocother.component';

describe('CancelWnocotherComponent', () => {
  let component: CancelWnocotherComponent;
  let fixture: ComponentFixture<CancelWnocotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [CancelWnocotherComponent],
      providers: [
        ManipulateDomService,
        {
          provide: WnocotherMoldel,
          useClass: WithDrawalMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelWnocotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
