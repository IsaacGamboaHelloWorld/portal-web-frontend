import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { PocketsModelMock } from '../../../../../../../test-helpers/mocks/models/pockets.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { CurrencyModule } from '../../../../../shared/currency/currency.module';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';
@Component({
  template: `
    <div [formGroup]="form">
      <input formControlName="id" />
    </div>
  `,
})
class TestComponent {
  public form: FormGroup = new FormGroup({
    id: new FormControl(undefined),
  });
}
describe('StepOneMoveComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        TestingModule,
        ReactiveFormsModule,
        CurrencyModule.forRoot('es-US'),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: MovePocketPocketsFacade,
          useValue: PocketsModelMock,
        },
        {
          provide: HomePocketsFacade,
          useValue: PocketsModelMock,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });
  it('should create', inject(
    [MovePocketPocketsFacade],
    (bla: MovePocketPocketsFacade) => {
      bla.activeProduct$ = PocketsModelMock.activeProduct$;
      bla.activePocket$ = PocketsModelMock.activePocket$;
      bla.movedMoney$ = PocketsModelMock.movedMoney$;
      bla.clearMovements = PocketsModelMock.clearMovements;
      expect(component).toBeTruthy();
    },
  ));
  it('should submit is pocket', inject(
    [MovePocketPocketsFacade],
    (bla: MovePocketPocketsFacade) => {
      bla.activeProduct$ = PocketsModelMock.activeProduct$;
      bla.activePocket$ = PocketsModelMock.activePocket$;
      bla.movedMoney$ = PocketsModelMock.movedMoney$;
      bla.moveToPocket = PocketsModelMock.moveToPocket;
      expect(component).toBeTruthy();
    },
  ));
  it('should submit is not pocket', inject(
    [MovePocketPocketsFacade],
    (bla: MovePocketPocketsFacade) => {
      bla.activeProduct$ = PocketsModelMock.activeProduct$;
      bla.activePocket$ = PocketsModelMock.activePocket$;
      bla.moveToAccount = PocketsModelMock.moveToAccount;
      expect(component).toBeTruthy();
    },
  ));
});
