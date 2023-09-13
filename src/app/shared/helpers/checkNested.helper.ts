import { AuthToken } from '@core/services/auth-token';
import { isNullOrUndefined } from 'util';

export function checkNested(properties: any[], state: object): boolean {
  const value = properties.reduce(
    (xs, x) => (xs && xs[x] ? xs[x] : null),
    state,
  );
  return !isNullOrUndefined(value);
}

export function userToken(authToken: AuthToken): () => Promise<any> {
  return (): Promise<any> => {
    authToken.checkInitToken();
    return Promise.resolve({});
  };
}
