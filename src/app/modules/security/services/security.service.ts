import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PSE_RETURN_PB, SECURITY, TIMESTAMP } from '@core/constants/auth';
import { TIME_SYMMETRIC_SESSION } from '@core/constants/global';
import { environment } from '@environment';
import { Security } from '@modules/security/utils/security';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import * as utilsSecurity from '../utils/security.util';

// tslint:disable-next-line:ban-types
declare var rsaFunc: Function;

export interface Symmetric {
  id: string;
  iv: string;
  key: string;
  expiration?: number;
  hmacKey: string;
}

export interface GetSymmetricKeyRequest {
  publicKey: string;
  timestamp: string;
  trust1: string;
  trust2: string;
}

export interface GetPublicKeyResponse {
  publicKey: string;
}

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private rsaData: string;
  private _key: CryptoKeyPair;
  private _symmetric: Symmetric;
  private _keySymmetric: CryptoKey;
  private _timeSymmetric: number = TIME_SYMMETRIC_SESSION;
  private _serverPublicKey: string;
  private lastGeneration: number = Date.now();
  private interval: number = 3600000;

  constructor(private security: Security, private http: HttpClient) {
    this.rsaData = rsaFunc();
  }

  get symmetric(): Symmetric {
    return this._symmetric;
  }

  get id(): string {
    if (this.hasKeys) {
      return this._symmetric.id;
    }
    return '';
  }

  get hasKeys(): boolean {
    return (
      !isNullOrUndefined(this._symmetric) &&
      !isNullOrUndefined(this._keySymmetric)
    );
  }

  get timeSymmetric(): number {
    return this._timeSymmetric;
  }

  public async setSymmetric(): Promise<boolean> {
    if (!this.hasKeys) {
      const keys = this.getItem(SECURITY);
      if (!isNullOrUndefined(keys)) {
        this._symmetric = JSON.parse(keys);
        this._keySymmetric = await this.security.importAesGcmKey(
          this._symmetric.key,
        );
      }
    }
    return this.hasKeys;
  }

  public async encryptAesGcm(data: string = ''): Promise<string> {
    await this.setSymmetric();
    if (this.hasKeys) {
      return this.security.encryptAesGcm(
        data,
        this._symmetric.iv,
        this._keySymmetric,
      );
    } else {
      return Promise.reject();
    }
  }

  public async decryptAesGcm(data: string = ''): Promise<string> {
    await this.setSymmetric();
    if (this.hasKeys) {
      return this.security.decryptAesGcm(
        data,
        this._symmetric.iv,
        this._keySymmetric,
      );
    } else {
      return Promise.reject();
    }
  }

  public validateKey(): Observable<any> {
    return this.http.get(
      environment.api.base + environment.api.services.validate_security_session,
    );
  }

  public deleteKey(): void {
    this.http
      .get(
        environment.api.base + environment.api.services.close_security_session,
      )
      .subscribe(() => {
        this._symmetric = this._keySymmetric = null;
        this.removeItem(SECURITY);
      });
  }

  public async getSymmetricKey(): Promise<boolean> {
    await this.setSymmetric();
    if (!this.hasKeys || this.lastGeneration + this.interval < Date.now()) {
      try {
        const data = await this.buildRequestBody();
        const url =
          environment.api.base + environment.api.services.symmetric_key;
        const response = await this.http.post<Symmetric>(url, data).toPromise();
        await this.processResponse(response);
      } catch (e) {}
    }
    return this.hasKeys;
  }

  private async buildRequestBody(): Promise<GetSymmetricKeyRequest> {
    await this.getCipherPublicKey();
    this._key = await this.security.generateRsaPkcs1KeyPair();
    const publicKey = await this.security.exportPublicKey(this._key.publicKey);
    const hash = utilsSecurity.sha(publicKey);
    const hashSlice =
      hash.substring(0, 6) + hash.substring(hash.length - 6, hash.length);
    const trustOne = this.security.encryptRsaPkcs1String(
      hashSlice,
      this._serverPublicKey,
    ) as string;
    const trustTwo = await this.security.signRsaPkcs1(
      trustOne,
      this._key.privateKey,
    );
    const timestamp = this.security.encryptRsaPkcs1String(
      Date.now().toString(),
      this._serverPublicKey,
    ) as string;
    return {
      publicKey,
      timestamp,
      trust1: trustOne,
      trust2: trustTwo,
    };
  }

  public async getCipherPublicKey(): Promise<void> {
    if (isNullOrUndefined(this._serverPublicKey)) {
      const url =
        environment.api.base + environment.api.services.cipher_public_key;
      const response = await this.http
        .get<GetPublicKeyResponse>(url)
        .toPromise();
      this._serverPublicKey = response.publicKey;
    }
  }

  private async processResponse(response: Symmetric): Promise<void> {
    const privateKey = await this.security.exportPrivateKey(
      this._key.privateKey,
    );
    this._symmetric = {
      id: response.id,
      iv: this.security.decryptRsaPkcs1String(
        response.iv,
        privateKey,
      ) as string,
      key: this.security.decryptRsaPkcs1String(
        response.key,
        privateKey,
      ) as string,
      hmacKey: this.security.decryptRsaPkcs1String(
        response.hmacKey,
        privateKey,
      ) as string,
    };
    this._timeSymmetric = response.expiration;
    this.interval = (response.expiration * 1000) / 2;
    this.setItem(SECURITY, JSON.stringify(this._symmetric));
    this.lastGeneration = Date.now();
    this._keySymmetric = await this.security.importAesGcmKey(
      this._symmetric.key,
    );
  }

  public hmac(input: string): string {
    return utilsSecurity.hmac(input, this._symmetric.hmacKey);
  }

  public getItem(key: string): string {
    const signatureKey = this.getSignatureKey(key);
    const data = this.getEncodedItem(key);
    const signature = this.getEncodedItem(signatureKey);
    if (
      !isNullOrUndefined(data) &&
      !isNullOrUndefined(signature) &&
      this.getSignature(data) === signature
    ) {
      return data;
    }
  }

  public removeItem(key: string): void {
    const signatureKey = this.getSignatureKey(key);
    this.removeEncodedItem(key);
    this.removeEncodedItem(signatureKey);
  }

  public setItem(key: string, data: string): void {
    if (!isNullOrUndefined(data)) {
      const signatureKey = this.getSignatureKey(key);
      const signature = this.getSignature(data);
      this.setEncodedItem(key, data);
      this.setEncodedItem(signatureKey, signature);
    }
  }

  public clear(): void {
    sessionStorage.clear();
  }

  private getEncodedItem(key: string): string {
    key = this.encode(key);
    const data = sessionStorage.getItem(key);
    if (!isNullOrUndefined(data)) {
      return this.decode(data);
    }
  }

  private removeEncodedItem(key: string): void {
    key = this.encode(key);
    sessionStorage.removeItem(key);
  }

  public setEncodedItem(key: string, data: string): void {
    key = this.encode(key);
    data = this.encode(data);
    sessionStorage.setItem(key, data);
  }

  private encode(data: string): string {
    try {
      const encoded = btoa(data);
      return this.shift(encoded, -10);
    } catch (Error) {
      return '';
    }
  }

  private decode(data: string): string {
    try {
      const shifted = this.shift(data, 10);
      return atob(shifted);
    } catch (Error) {
      return '';
    }
  }

  private shift(data: string, shift: number): string {
    let shifted = '';
    for (let i = 0; i < data.length; i++) {
      shifted += String.fromCharCode(data.charCodeAt(i) + shift);
    }
    return shifted;
  }

  private getSignatureKey(key: string): string {
    return key + '51Gn';
  }

  private getSignature(data: string): string {
    return utilsSecurity.hmac(data, this.rsaData);
  }

  public setPaymentId(paymentId: string): void {
    localStorage.setItem(PSE_RETURN_PB, paymentId);
  }

  public getPaymentId(): string {
    return localStorage.getItem(PSE_RETURN_PB);
  }

  public removePaymentId(): void {
    localStorage.removeItem(PSE_RETURN_PB);
  }

  public setTimestamp(timestamp: string): void {
    localStorage.setItem(TIMESTAMP, timestamp);
  }

  public getTimestamp(): string {
    return localStorage.getItem(TIMESTAMP);
  }

  public removeTimestamp(): void {
    localStorage.removeItem(TIMESTAMP);
  }
}
