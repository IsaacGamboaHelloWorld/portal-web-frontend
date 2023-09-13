import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { HomeModel } from '@app/modules/home/home.model';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { yourPlusMock } from '@root/test-helpers/mocks/data/your-plus.mock';
import { HomeModelMock } from '@root/test-helpers/mocks/models/home.model.mock';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { Subject } from 'rxjs';
import { NavigateYourPlus } from '../../constants/routes';
import { ModalSuccessComponent } from '../../shared/modal-success/modal-success.component';
import { YourPlusModel } from '../../store/models/your-plus.model';

import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [StepTwoComponent],
      providers: [
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
        ModalService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    component.actualPoints = 0;
    fixture.detectChanges();
  });

  it('should create StepTwoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigateYourPlus);
  });

  it('_loadTuPlus', () => {
    component.toPlus$.subscribe((data: any) => {
      data = yourPlusMock;
      expect(data).toBeTruthy();
    });
  });

  it('goToRedeem actualPoints > minPoints', () => {
    component.actualPoints = 2;
    component.minPoints = 1;
    const spy = spyOn(component as any, '_setStep');
    (component as any).goToRedeem();
    expect(spy).toHaveBeenCalled();
  });
  it('goToRedeem actualPoints < minPoints', () => {
    component.actualPoints = 1;
    component.minPoints = 2;
    const spy = spyOn(component as any, '_showToastInfo');

    (component as any).goToRedeem();
    expect(spy).toHaveBeenCalled();
  });

  it('_loadFirstMessage minPoints  >= actualPoints', () => {
    component.minPoints = 2;
    component.actualPoints = 1;
    (component as any)._loadFirstMessage();

    jasmine.clock().install();
    jasmine.clock().tick(10);
    (component as any)._loadFirstMessage();
    jasmine.clock().uninstall();
  });

  it('openModal', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');
    const spyActions = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();
    (component as any).openModal();
    expect(spyModal).toHaveBeenCalledWith(
      ModalSuccessComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    jasmine.clock().tick(10);
    expect(spyActions).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal ', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              actionCancel: new Subject(),
              actionAgree: new Subject(),
            },
          },
        },
      },
    };

    (component as any)._modal = mockModal;

    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();

    mockModal._dialogComponentRef.instance.componentRef.instance.actionCancel
      .pipe()
      .subscribe((_data: any) => {
        expect(spyClose).toHaveBeenCalled();
      });
  });

  it('_actionsModal without _dialogComponentRef', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (component as any)._actionsModal();
    expect(spyClose).not.toHaveBeenCalled();
  });
});
