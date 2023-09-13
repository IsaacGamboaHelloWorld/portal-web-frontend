import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export function mapErrorReponse(response: GenericResponse): [string, string] {
  let message: string;
  let subMessage: string;

  if (!!response.errorMessage && !!response.errorStatusCode) {
    message = `(${response.errorStatusCode}) ${response.errorMessage}`;
  } else if (!!response.errorMessage) {
    message = response.errorMessage;
  }

  if (!!response['description'] && !!response.errorStatusCode) {
    message = `(${response.errorStatusCode}) ${response['description']}`;
  } else if (!!response['description']) {
    message = response['description'];
  }

  if (
    !!response.specificErrorCode &&
    response.specificErrorCode !== '' &&
    !!response.specificErrorMessage &&
    response.specificErrorMessage !== ''
  ) {
    subMessage = `(${response.specificErrorCode}) ${response.specificErrorMessage}`;
  } else if (!!response.specificErrorMessage) {
    subMessage = response.specificErrorMessage;
  }

  return [message, subMessage];
}
