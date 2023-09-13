import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { WithDrawalMock } from '../../../../../../test-helpers/mocks/models/withdrawal.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { WnocotherMoldel } from '../../wnocother.model';

import { StepThreeComponent } from './step-three.component';

describe('StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepThreeComponent],
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
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doEdit', () => {
    const model = TestBed.get(WnocotherMoldel);
    const spy = spyOn(model, 'setStepW');

    component.doEdit();

    expect(spy).toHaveBeenCalledWith(1);
  });
});
