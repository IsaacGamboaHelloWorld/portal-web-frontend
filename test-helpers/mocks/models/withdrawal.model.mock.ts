import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WithDrawalMock {
  public typeTransaction$: BehaviorSubject<number> = new BehaviorSubject(1);
  public stepW$: BehaviorSubject<number> = new BehaviorSubject(1);
  public dataForm$: BehaviorSubject<number> = new BehaviorSubject(1);
  public setOtp$: BehaviorSubject<number> = new BehaviorSubject(1);
  public products$: BehaviorSubject<number> = new BehaviorSubject(1);

  public listRules: string[] = [
    '1. Solicitar este código temporal no generará 🤟',
    '2. depende del tipo de cuenta y convenio que tienes. 🙂',
    '3. Cuando vayas a retirar el dinero',
    '4. Si le giras a otra persona, y se la pediremos al momento de retirar el dinero. 🤓',
  ];

  public sendWithDrawal(): void {}
  public resetWithDrawal(): void {}
  public resetTransfer(): void {}
  public setTypeTransaction(): void {}
  public setDataForm(): void {}
  public setTemporalResponse(): void {}
  public setStepW(): void {}
}
