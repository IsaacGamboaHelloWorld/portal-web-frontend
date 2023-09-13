import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { ImageCdnPipe } from '@app/core/pipes/image-cdn/image-cdn.pipe';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IAnswerActivateTc } from '../../entities/activate-tc';
import { ActivateTcModel } from '../../store/model/activate-tc.model';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ImageCdnPipe, CardTypeclassPipe, CardFranchiseTypePipe],
})
export class StepOneComponent implements OnInit, OnDestroy {
  public formStepOne: FormGroup;
  public typeCreditCard: string = 'empty';
  public approvalId: boolean = false;
  public subscribe: Subscription = new Subscription();
  public imageBase: string;
  public image: string;
  public showIcon: boolean = false;
  public showFranchise: boolean = false;
  @ViewChild('maskImgCard', null) maskImgCard: ElementRef;
  @ViewChild('maskImgFranchise', null) maskImgFranchise: ElementRef;
  @ViewChild('textMask', null) textMask: ElementRef;
  constructor(
    private model: ActivateTcModel,
    private modalService: ModalService,
    private pipeImg: ImageCdnPipe,
    private pipeClass: CardTypeclassPipe,
    private pipeFranchise: CardFranchiseTypePipe,
    private render: Renderer2,
  ) {}

  get stateActivate(): Observable<IAnswerActivateTc> {
    return this.model.stateActivateTc$;
  }

  ngOnInit(): void {
    this._initForm();
    const bgClass = this.pipeClass.transform('');
    this.imageBase = this.pipeImg.transform(bgClass['background']);
  }

  public _initForm(): void {
    this.formStepOne = new FormGroup({
      numberCreditCard: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
    });
  }
  public eventNumber(event: string): void {
    this.showFranchise = false;
    if (event && event.length > 5) {
      const bgClass = this.pipeClass.transform(
        this.formStepOne.value.numberCreditCard,
      );
      this.image = this.pipeImg.transform(bgClass['background']);
      this.render.setProperty(
        this.maskImgCard.nativeElement,
        'src',
        this.image ? this.image : '',
      );
      this.render.addClass(this.maskImgCard.nativeElement, 'hover');
      this.render.addClass(this.textMask.nativeElement, 'bg_visa');
    } else {
      this.render.removeClass(this.maskImgCard.nativeElement, 'hover');
      this.render.removeClass(this.textMask.nativeElement, 'bg_visa');
      this.render.addClass(this.maskImgCard.nativeElement, 'mask2');
      setTimeout(() => {
        this.render.setProperty(this.maskImgCard.nativeElement, 'src', '');
      }, 1000);
    }

    const franchise = this.pipeFranchise.transform(
      this.formStepOne.value.numberCreditCard,
    );
    const franchiseImg = this.pipeImg.transform(franchise);
    if (franchiseImg.indexOf('images/') > 0) {
      this.showFranchise = true;
      this.render.setProperty(
        this.maskImgFranchise.nativeElement,
        'src',
        franchiseImg,
      );
    }
  }

  public toggleInputType(): void {
    this.formStepOne.controls.numberCreditCard.setValue('');
  }

  public submitForm(): void {
    this.approvalId = true;
    this.model.creationSucces(this.formStepOne.value.numberCreditCard);
    this.subscribe = this.stateActivate
      .pipe(
        filter(
          (answer: IAnswerActivateTc) =>
            answer.success || answer.errorMessage !== '',
        ),
      )
      .subscribe((answer: IAnswerActivateTc) => {
        if (answer.success) {
          this.approvalId = false;
          this.formStepOne.controls['numberCreditCard'].setValue('');
          this.modalService.open(
            ModalSuccessComponent,
            false,
            `${SMALL_WIDTH} not-button-close`,
          );
        }
        if (answer.errorMessage) {
          this.approvalId = false;
        }
        this.subscribe.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
