import { BehaviorSubject } from 'rxjs';
import { getSecureMdmMock } from '../data/code-auth.mock';
import { responseOptionsModuleMock } from '../data/options-modules.mock';
import { unusualOperationsQuerySuccess } from '../data/unusual-operations.mock';

export class MainContainerModelMock {
  public userInfo$: BehaviorSubject<any> = new BehaviorSubject({
    data: {
      clientName: '',
      ...getSecureMdmMock,
    },
  });

  private innerOptionModule: any = responseOptionsModuleMock;
  set setInnerOptionModule(data: any) {
    this.innerOptionModule = data;
    this.optionModule$.next(data);
  }
  get getInnerOptionModule(): any {
    return this.innerOptionModule;
  }
  public optionModule$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerOptionModule,
  );

  public optionsModule$: BehaviorSubject<any> = new BehaviorSubject(
    responseOptionsModuleMock,
  );

  public unusualOperationsQuery$: BehaviorSubject<any> = new BehaviorSubject(
    unusualOperationsQuerySuccess,
  );

  public fetchUserData(): void {}

  public fetchProducts(): void {}

  public ValidateSession(): void {}

  public ValidatePing(): void {}

  public fetchToPlus(): void {}

  public logout(): void {}

  public fetchUserSecureData(): void {}

  public fetchFreeDestinationsAll(): void {}

  public optionModuleLoad(): void {}

  public fetchAdvertising(): void {}

  public fetchUnusualOperationsQueryLoad(): void {}

  public fetchUnusualOperationsQueryReset(): void {}

  public fetchUnusualOperationsApproveLoad(_body: any): void {}

  public fetchUnusualOperationsApproveReset(): void {}
}
