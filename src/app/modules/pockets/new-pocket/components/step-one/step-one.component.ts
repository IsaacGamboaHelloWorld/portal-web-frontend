import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filterByFC } from '@app/shared/helpers/check-sfb';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../../../../../core/models/products/product';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { setInitialValueCustomInfo } from '../../../../../shared/helpers/formValidators.helper';
import { validateData } from '../../../../../shared/helpers/validateData.helper';
import { IPocketActive } from '../../../home-pockets/store/reducers/active-pocket.reducer';
import { ICategoriesPocket, IPocketFormOne } from '../../entities/new-pockets';
import { NewPocketFacade } from '../../new-pocket.facade';

@Component({
  selector: 'app-step-one-pocket',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOnePocketsComponent implements OnInit {
  public formStepOne: FormGroup;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  public activePocket: IPocketActive;

  constructor(
    private facade: NewPocketFacade,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.facade.getCategories();
    this._initForm();
    this._setDefaultValue();
  }

  private _initForm(): void {
    this.facade.stepOne$
      .subscribe((info) => {
        this.formStepOne = new FormGroup({
          account_origin: new FormControl(
            validateData(info.account_origin, ''),
            Validators.required,
          ),
          name: new FormControl(validateData(info.name, ''), [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern(/^[A-Za-z\s0-9]*$/),
          ]),
          pocketType: new FormControl(
            validateData(info.type, ''),
            Validators.required,
          ),
        });
      })
      .unsubscribe();
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public submitForm(): void {
    const data: IPocketFormOne = {
      account_origin: this.formStepOne.value.account_origin,
      name: this.formStepOne.value.name,
      type: this.formStepOne.value.pocketType,
    };
    this.facade.setFormOne(data);
    this.nextStep();
  }

  public nextStep(): void {
    this.setStep.emit(2);
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public removeWrongCharacters($event: any): void {
    const value = $event.target.value.replace(/[^A-Za-z\s0-9]/g, '');
    this.formStepOne.controls.name.patchValue(value);
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass('.type-pocket-' + _id, 'active');
  }

  private _setDefaultValue(): void {
    combineLatest([this.facade.activeProduct$, this.facade.products$])
      .pipe(
        take(1),
        map((data) => {
          return { productDetail: data[0], products: data[1] };
        }),
      )
      .subscribe((info) => {
        setInitialValueCustomInfo(
          info.productDetail,
          info.products,
          null,
          this.formStepOne,
          ['account_origin'],
        );
      })
      .unsubscribe();
  }

  get categories$(): Observable<ICategoriesPocket> {
    return this.facade.categories$;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      map((product: Product[]) => {
        return filterByFC(product);
      }),
    );
  }
}
