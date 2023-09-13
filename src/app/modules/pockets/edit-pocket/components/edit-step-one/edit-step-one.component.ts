import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPocketActive } from '@app/modules/pockets/home-pockets/store/reducers/active-pocket.reducer';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { Navigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertCloseComponent } from '../../../../../core/components/alert-close/alert-close.component';
import { ClassNotification } from '../../../../../core/constants/notification';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { checkNested } from '../../../../../shared/helpers/checkNested.helper';
import { validateData } from '../../../../../shared/helpers/validateData.helper';
import { ModalService } from '../../../../../shared/modal/services/modal.service';
import { ICategoriesPocket } from '../../../move-pockets/entities/move-pockets';
import { EditPocketFacade } from '../../edit-pocket.facade';
import {
  ICategoriesEPocket,
  IDeletePocketRequest,
  IEditPocketRequest,
} from '../../entities/edit-pocket';
import { IDeletePocket } from '../../store/reducers/delete-pocket.reducer';
import { IEditPocket } from '../../store/reducers/edit-pocket.reducer';

@Component({
  selector: 'app-edit-step-one',
  templateUrl: './edit-step-one.component.html',
  styleUrls: ['./edit-step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditStepOneComponent implements OnInit, OnDestroy {
  public formStepOne: FormGroup;
  public activeData: IPocketActive;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public stepOne: boolean = true;
  public step: string = '';
  public options: object[];
  @Output() eventStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() eventFormStep: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();

  constructor(
    private facade: EditPocketFacade,
    private dom: ManipulateDomService,
    private router: Router,
    private translate: TranslateService,
    private modal: ModalService,
  ) {}

  ngOnInit(): void {
    this.options = [
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.WEEKLY', value: 'WEEKLY' },
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.BIWEEKLY', value: 'BIWEEKLY' },
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.MONTHLY', value: 'MONTHLY' },
    ];

    this.facade.getCategories();

    this.hasData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IPocketActive) => {
        if (!isNullOrUndefined(data)) {
          this.activeData = data;
        } else {
          this.router.navigate([Navigate.home]);
        }
      });

    this._initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  private _initForm(): void {
    this.hasData$
      .subscribe((info: IPocketActive) => {
        if (info) {
          this.formStepOne = new FormGroup({
            name: new FormControl(validateData(info.pocketName, ''), [
              Validators.required,
              Validators.maxLength(15),
              Validators.pattern(/^[A-Za-z\s0-9]*$/),
            ]),
            pocketType: new FormControl(
              validateData(info.pocketType, ''),
              Validators.required,
            ),
            amount: new FormControl(
              validateData(info.savingGoal, ''),
              Validators.required,
            ),
            periodicity_amount: new FormControl(
              validateData(info.amountPeriodicSavings, ''),
              Validators.required,
            ),
            period: new FormControl(
              validateData(info.pocketPeriod, ''),
              Validators.required,
            ),
            amountSaved: new FormControl(validateData(info.amountSaved, '')),
          });
          setTimeout(() => {
            this.formStepOne.controls['amount'].setValue(info.savingGoal);
            this.formStepOne.controls['periodicity_amount'].setValue(
              info.amountPeriodicSavings,
            );
            if (this.formStepOne) {
              this.formStepOne.updateValueAndValidity();
              this.eventFormStep.emit(this.formStepOne);
            }
          }, 1);
        }
      })
      .unsubscribe();

    this.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICategoriesEPocket) => {
        if (!isNullOrUndefined(data) && this.activeData) {
          setTimeout(() => this._categoriesResponse(data), 100);
        }
      });
    if (this.formStepOne) {
      this.formStepOne.updateValueAndValidity();
    }
  }

  private _categoriesResponse(data: ICategoriesEPocket): void {
    this.formStepOne.controls['pocketType'].setValue(this.activeData.category);
    this.formStepOne.controls['period'].setValue(this.activeData.pocketPeriod);
    this.setClass(this.activeData.category === 'Gasto' ? '0' : '1');
  }

  public nextStep(): void {
    this.stepOne = false;
  }

  public editForm(): void {
    if (!isNullOrUndefined(this.activeData)) {
      const _data: IEditPocketRequest = {
        category: this.formStepOne.value.pocketType,
        parentAccountId: this.activeData.parentId,
        parentAccountType: this.activeData.parentType,
        periodicAmount: this.formStepOne.value.periodicity_amount,
        pocketId: this.activeData.pocketId,
        pocketName: this.formStepOne.value.name,
        pocketPeriod: this.formStepOne.value.period,
        pocketType: this.activeData.pocketType,
        savingAmount: this.formStepOne.value.amount,
      };
      this.facade.editPocket(_data);

      this.pocketEdit$.pipe(takeUntil(this.destroy$)).subscribe((info) => {
        if (!!info.data && info.data.success) {
          this.eventStep.emit('EDIT');
          this.facade.notificationOpen(
            this.translate.instant('POCKETS.EDIT.EDIT.MSG'),
            true,
            ClassNotification.SUCCESS,
          );
          this.router.navigate([Navigate.pockets]);
        } else if (info.loaded) {
          this.facade.clearDelete();
        }
      });
    }
  }
  public deletePocket(): void {
    if (!isNullOrUndefined(this.activeData)) {
      const _data: IDeletePocketRequest = {
        pocketId: this.activeData.pocketId,
        pocketType: this.activeData.pocketType,
        parentAccountId: this.activeData.parentId,
        parentAccountType: this.activeData.parentType,
      };
      this.facade.deletePocket(_data);
      this.pocketDelete$
        .pipe(takeUntil(this.destroy$))
        .subscribe((info: IDeletePocket) => {
          if (!!info.data && info.data.success) {
            this.eventStep.emit('DELETE');
            this.modal.close();
          } else if (info.error) {
            this.modal.close();
            this.facade.clearDelete();
          }
        });
    }
  }

  public openAlert(): void {
    this.modal.open(
      AlertCloseComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modal._dialogComponentRef,
      )
    ) {
      const component = this.modal._dialogComponentRef.instance.componentRef
        .instance;

      component.title = 'POCKETS.EDIT.DELETE.POPUP.TITLE';
      component.desc = 'POCKETS.EDIT.DELETE.POPUP.DESC';
      component.img = '/delete.png';
      component.btnCancel = 'POCKETS.EDIT.DELETE.POPUP.CANCEL';
      component.btnAgree = 'POCKETS.EDIT.DELETE.POPUP.ACCEPT';

      component.actionCancel.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this.modal.close();
      });
      component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this.deletePocket();
      });
    }
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass('.type-pocket-' + _id, 'active');
  }

  get pocketEdit$(): Observable<IEditPocket> {
    return this.facade.editPocket$;
  }
  get pocketDelete$(): Observable<IDeletePocket> {
    return this.facade.deletePocket$;
  }

  get categories$(): Observable<ICategoriesPocket> {
    return this.facade.categories$;
  }

  get hasData$(): Observable<IPocketActive> {
    return this.facade.activePocket$;
  }
}
