import { Injectable } from '@angular/core';
import { Product } from '@core/models/products/product';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewsModelMock {
  public productsOrigin$: BehaviorSubject<object> = new BehaviorSubject({});
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public pockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepOne$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepThree$: BehaviorSubject<object> = new BehaviorSubject({});
  public pocketInfo$: BehaviorSubject<object> = new BehaviorSubject({});
  public hasPocket: BehaviorSubject<object> = new BehaviorSubject({});
  public loadPrefs$: BehaviorSubject<object> = new BehaviorSubject({});
  public slide$: BehaviorSubject<object[]> = new BehaviorSubject([
    {
      TITLE: 'Bienvenido a tu portal transaccional',
      TEXT: 'Hemos escuchado ',
      BOLD_TEXT: '',
    },
    {
      TITLE: 'Paga todo lo que necesites',
      TEXT: 'Aquí puedes pagar ',
      BOLD_TEXT: '',
    },
    {
      TITLE: 'Inscribe tus pagos',
      TEXT: 'Inscribe tus ',
      BOLD_TEXT: 'servicios públicos',
    },
    {
      TITLE: 'Programa el pago de tus servicios',
      TEXT: 'Consulta el detalle de tus pagos',
      BOLD_TEXT: 'Activar pago programado',
    },
    {
      TITLE: '¡Tus documentos están disponibles!',
      TEXT: 'Ya puedes consultar',
      BOLD_TEXT: '“Tus documentos”.',
    },
  ]);
  public static moveToPocket(_data: any): void {}
  public static moveToAccount(_data: any): void {}
  public static clearMovements(): void {}
  public clearDelete(): void {}
  public clearEdit(): void {}
  public hasPockets(): void {}
  public fetchHome(): void {}
  public resetHome(): void {}
  public resetPocket(): void {}
  public getCategories(): void {}
  public createPocket(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public setFormThree(): void {}
  public setProduct(): void {}
  public setActivePocket(): void {}
  public getPrefs(): void {}
  public setPrefs(): void {}
}
