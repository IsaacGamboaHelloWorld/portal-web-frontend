import { EventEmitter } from '@angular/core';

export interface IDsModal {
  actionCancel: EventEmitter<any>;
  actionAgree: EventEmitter<any>;
  title: string;
  subtitle: string;
  description: string;
  typeModal: string;
  img: string;
  btnCancel: string;
  btnAgree: string;
  buttonsInColumn: boolean;
}
