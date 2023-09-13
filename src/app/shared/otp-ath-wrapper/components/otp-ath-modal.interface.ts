import { EventEmitter } from '@angular/core';

export interface IOtpAthAgree {
  otp: string;
  retries: number;
  event: 'success' | 'error';
}

export interface IOtpAhtModalComponent {
  actionCancel: EventEmitter<any>;
  actionAgree: EventEmitter<any>;
  img: string;
  txtTitle: string;
  txtDescription: string;
  txtCode: string;
  txtError: string;
  txtBtn: string;
  isLoading: boolean;
  isDisabled: boolean;
  enableCloseAgree: boolean;
  retries: number;
}
