import { environment } from '@environment';
import { isNullOrUndefined } from 'util';

export function isWebAuthnAvailable(): boolean {
  return (
    !environment.pilot &&
    !isNullOrUndefined(navigator['credentials']) &&
    !isNullOrUndefined(window['PublicKeyCredential'])
  );
}
