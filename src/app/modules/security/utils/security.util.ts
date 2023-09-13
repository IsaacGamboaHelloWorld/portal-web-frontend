import * as sha512 from 'js-sha512';

export const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function sha(value: string): any {
  return sha512.sha512(value);
}

export function hmac(value: string, key: string): any {
  return sha512.sha512.hmac(key, value);
}

export function addNewLines(str: string): any {
  let finalString = '';
  while (str.length > 0) {
    finalString += `${str.substring(0, 64)}\r\n`;
    str = str.substring(64);
  }

  return finalString;
}

export function removeLines(str: string): string {
  return str.replace(/\r?\n|\r/g, '');
}

export function convertArrayBufferToString(arrayBuffer: ArrayBuffer): string {
  let str = '';
  const buffer = new Uint8Array(arrayBuffer);
  for (let iii = 0; iii < buffer.byteLength; iii++) {
    str += String.fromCharCode(buffer[iii]);
  }

  return str;
}

export function convertStringToArrayBuffer(str: string): ArrayBuffer {
  const arrayBuffer = new ArrayBuffer(str.length);
  const bytes = new Uint8Array(arrayBuffer);

  for (let iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii);
  }

  return arrayBuffer;
}

export function convertArrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  let i = 0;
  const len = bytes.length;
  let base64 = '';

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1);
    base64 = `${base64}=`;
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2);
    base64 = `${base64}==`;
  }

  return base64;
}

export function convertBase64ToArrayBuffer(base64: string): any {
  let bufferLength = base64.length * 0.75;
  const len = base64.length;
  let p = 0;

  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const bytes = new Uint8Array(arrayBuffer);

  for (let i = 0; i < len; i += 4) {
    const encoded1 = lookup()[base64.charCodeAt(i)];
    const encoded2 = lookup()[base64.charCodeAt(i + 1)];
    const encoded3 = lookup()[base64.charCodeAt(i + 2)];
    const encoded4 = lookup()[base64.charCodeAt(i + 3)];
    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }
  return arrayBuffer;
}

function lookup(): Uint8Array {
  const look = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    look[chars.charCodeAt(i)] = i;
  }
  return look;
}
