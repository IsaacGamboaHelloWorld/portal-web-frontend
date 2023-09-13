import { Security } from '@modules/security/utils/security';
// tslint:disable-next-line:no-var-requires
const JSEncrypt = require('../../../../assets/js/jsencrypt.min.js');

describe('Security', () => {
  let security: Security;

  beforeEach(() => {
    security = new Security();
  });

  afterEach(() => {
    security = null;
  });

  it('should be validate option', async () => {
    const key = await security.generateRsaPkcs1KeyPair();
    expect(key).toBeDefined();

    const rsa = await security.signRsaPkcs1('text', key.privateKey);
    expect(rsa).toEqual(jasmine.any(String));

    const publicKey = await security.exportPublicKey(key.publicKey);
    expect(publicKey).toContain('-----BEGIN PUBLIC KEY-----');

    const privateKey = await security.exportPrivateKey(key.privateKey);
    expect(privateKey).toContain('-----BEGIN PRIVATE KEY-----');

    const encrypt = await security.encryptAesGcm(
      'test',
      'ZFoXfy1krTrgjMUAu1Hhz5udXsAbE418',
      key.privateKey,
    );
    expect(encrypt).toBeDefined();

    const aes = await security.importAesGcmKey(
      'FuP6CR4UMF3pmJhXLZQu32M2pvV4EGKP',
    );
    expect(aes).toBeDefined();

    const decrypt = await security.decryptAesGcm(
      'PGD8esBRfeve1UY5uxH0dZ4IZgD4ZWEzqQ9TzJizVkeLrXTSU7qDh7PAG4zF5InFFkXnGqkis43snKrq2bR7KtZNTJ/NbErMzI3x5VWk9sYlk8KXpQ==',
      'ZFoXfy1krTrgjMUAu1Hhz5udXsAbE418',
      aes,
    );
    expect(decrypt).toBeDefined();

    const text = await security.encryptRsaPkcs1String('test', 'dfsgg');
    expect(text).toBeFalsy();

    const text2 = await security.decryptRsaPkcs1String('r3rt234324', 'test');
    expect(text2).toBeFalsy();
  });
});
