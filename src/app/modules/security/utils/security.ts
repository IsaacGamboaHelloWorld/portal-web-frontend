import * as utils from './security.util';

type Algorithm = 'AES-CBC' | 'RSA-OAEP' | 'AES-GCM';

declare var JSEncrypt;

export class Security {
  private subtleCryto: SubtleCrypto;

  constructor() {
    this.subtleCryto = window.crypto.subtle;
  }

  public exportPublicKey(key: CryptoKey): PromiseLike<string> {
    return this.exportKey('spki', key).then((exportedKey) => {
      const base64 = utils.convertArrayBufferToBase64(exportedKey);
      const pem = utils.addNewLines(base64);
      return `-----BEGIN PUBLIC KEY-----\r\n${pem}-----END PUBLIC KEY-----`;
    });
  }

  private exportKey(
    format: 'raw' | 'pkcs8' | 'spki',
    key: CryptoKey,
  ): PromiseLike<ArrayBuffer> {
    return this.subtleCryto.exportKey(format, key);
  }

  public exportPrivateKey(key: CryptoKey): PromiseLike<string> {
    return this.exportKey('pkcs8', key).then((exportedKey) => {
      const base64 = utils.convertArrayBufferToBase64(exportedKey);
      const pem = utils.addNewLines(base64);
      return `-----BEGIN PRIVATE KEY-----\r\n${pem}-----END PRIVATE KEY-----`;
    });
  }

  public encryptRsaPkcs1String(
    data: string,
    publicKey: string,
  ): string | false {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
  }

  public decryptRsaPkcs1String(data: any, key: string): string | false {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(key);
    return decrypt.decrypt(data);
  }

  public encryptAesGcm(
    data: string,
    iv: string,
    key: CryptoKey,
  ): PromiseLike<string> {
    return this.encrypt(
      utils.convertStringToArrayBuffer(data),
      utils.convertStringToArrayBuffer(iv),
      'AES-GCM',
      key,
    ).then(
      (encrypted) => {
        return utils.convertArrayBufferToBase64(encrypted);
      },
      (error) => {
        return error;
      },
    );
  }

  public decryptAesGcm(
    data: string,
    iv: string,
    key: CryptoKey,
  ): PromiseLike<string> {
    return this.decrypt(
      utils.convertBase64ToArrayBuffer(data),
      utils.convertStringToArrayBuffer(iv),
      'AES-GCM',
      key,
    ).then(
      (decrypted) => {
        return utils.convertArrayBufferToString(decrypted);
      },
      (error) => {
        return error;
      },
    );
  }

  public importAesGcmKey(data: string): PromiseLike<CryptoKey> {
    return this.subtleCryto.importKey(
      'raw',
      utils.convertStringToArrayBuffer(data),
      'AES-GCM',
      true,
      ['encrypt', 'decrypt'],
    );
  }

  private encrypt(
    data: ArrayBuffer,
    iv: ArrayBuffer,
    algorithm: Algorithm,
    key: CryptoKey,
  ): PromiseLike<ArrayBuffer> {
    return this.subtleCryto
      .encrypt(
        {
          name: algorithm,
          iv,
        },
        key,
        data,
      )
      .then((value) => {
        return value;
      });
  }

  private decrypt(
    data: ArrayBuffer,
    iv: ArrayBuffer,
    algorithm: Algorithm,
    key: CryptoKey,
  ): any {
    return this.subtleCryto.decrypt({ name: algorithm, iv }, key, data);
  }

  public signRsaPkcs1(
    data: string,
    privateKey: CryptoKey,
  ): PromiseLike<string> {
    return this.subtleCryto
      .sign(
        'RSASSA-PKCS1-v1_5',
        privateKey,
        utils.convertStringToArrayBuffer(data),
      )
      .then((signature) => {
        return utils.convertArrayBufferToBase64(signature);
      });
  }

  public generateRsaPkcs1KeyPair(): PromiseLike<CryptoKeyPair> {
    return this.subtleCryto.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
      },
      true,
      ['sign', 'verify'],
    );
  }
}
