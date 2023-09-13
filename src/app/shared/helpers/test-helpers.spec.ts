import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthToken } from '@app/core/services/auth-token';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { checkNested, userToken } from '@app/shared/helpers/checkNested.helper';
import { compareSelect } from '@app/shared/helpers/compareSelect.helper';
import {
  initGreeting,
  validateHour,
} from '@app/shared/helpers/greetings.helper';
import { InfoModal } from '@app/shared/helpers/infoModal.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { ApplicationModelMock } from '../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ProductsMock } from './../../../../test-helpers/mocks/data/products.mock';
import { downloadFile, downloadFileWithJS } from './downloadFile.helpers';
import { isMobile } from './isMobile';
import { loadAmount } from './loadAmount.helper';

describe('TestHelpers', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        AuthToken,
        SecurityService,
        Security,
        AuthSession,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    }).compileComponents();
  }));

  it('should be return boolean checkNested', () => {
    const value = { hey: { child: 1 } };

    expect(checkNested(['hey'], value)).toBeTruthy();
    expect(checkNested(['other'], value)).toBeFalsy();
  });

  it('should be return boolean compareSelect', () => {
    const value1 = { hey: { child: 1 } };
    const value2 = { hey: { child: 1 } };
    const property = 'hey';

    expect(compareSelect(value1, value2, property)).toBeFalsy();
  });

  it('compareSelect when value1 is equal value2 and without value', () => {
    const value1 = '';
    const value2 = '';
    const property = 'property';

    const result = compareSelect(value1, value2, property);

    expect(result).toBeTruthy();
  });

  it('should be return string initGreeting', () => {
    const property1 = 'hey1';
    const property2 = 'hey2';
    const property3 = 'hey3';

    expect(initGreeting(property1, property2, property3)).toBeTruthy();
  });

  it('initGreeting with return null', () => {
    const morning = 'morning';
    const afternoon = 'afternoon';
    const night = 'night';

    const mockDate = {
      getHours: () => {
        return null;
      },
    };
    spyOn(global, 'Date').and.returnValue(mockDate as any);

    const result = initGreeting(morning, afternoon, night);

    expect(result).toEqual(morning);
  });

  it('should be return string validateHour', () => {
    const property0 = 0;
    const property1 = 'hey1';
    const property2 = 'hey2';
    const property3 = 'hey3';

    expect(
      validateHour(property0, property1, property2, property3),
    ).toBeTruthy();
  });

  it('should be return any InfoModal', () => {
    const value1 = { hey: { child: 1 } };
    const value2 = 'hey1';
    const value3 = 'hey2';
    const value4 = 'hey3';
    const value5 = 'hey3';

    expect(InfoModal(value1, value2, value3, value4, value5)).toBeTruthy();
  });

  it('mapErrorReponse with specificErrorCode and specificErrorCode', () => {
    const errorMessage = 'Not Fount';
    const errorStatusCode = '404';
    const specificErrorMessage = 'Bad Request';
    const specificErrorCode = '400';

    const response: GenericResponse = {
      success: true,
      errorMessage,
      errorStatusCode,
      specificErrorMessage,
      specificErrorCode,
    };

    const result = mapErrorReponse(response);

    expect(result).toEqual([
      `(${response.errorStatusCode}) ${response.errorMessage}`,
      `(${response.specificErrorCode}) ${response.specificErrorMessage}`,
    ]);
  });

  it('mapErrorReponse without errorStatusCode and specificErrorCode', () => {
    const errorMessage = 'Not Fount';
    const specificErrorMessage = 'Bad Request';

    const response: GenericResponse = {
      success: true,
      errorMessage,
      specificErrorMessage,
    };

    const result = mapErrorReponse(response);

    expect(result).toEqual([
      response.errorMessage,
      response.specificErrorMessage,
    ]);
  });

  it('mapErrorReponse with description and errorStatusCode', () => {
    const description = 'Not Fount';
    const errorStatusCode = '404';
    const specificErrorMessage = 'Bad Request';
    const specificErrorCode = '400';

    const response: any = {
      success: true,
      errorStatusCode,
      description,
      specificErrorMessage,
      specificErrorCode,
    };

    const result = mapErrorReponse(response);

    expect(result).toEqual([
      `(${response.errorStatusCode}) ${response.description}`,
      `(${response.specificErrorCode}) ${response.specificErrorMessage}`,
    ]);
  });

  it('mapErrorReponse with description and without errorStatusCode', () => {
    const description = 'Not Fount';
    const specificErrorMessage = 'Bad Request';
    const specificErrorCode = '400';

    const response: any = {
      success: true,
      description,
      specificErrorMessage,
      specificErrorCode,
    };

    const result = mapErrorReponse(response);

    expect(result).toEqual([
      response.description,
      `(${response.specificErrorCode}) ${response.specificErrorMessage}`,
    ]);
  });

  it('mapErrorReponse without response', () => {
    const response: GenericResponse = {
      success: true,
    };

    const result = mapErrorReponse(response);

    expect(result).toEqual([undefined, undefined]);
  });

  it('loadAmount with loading true and amount is null', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: true,
      amount: 1000,
    };
    const text = 'message';
    const amount = null;
    const textLoading = 'loading';

    const result = loadAmount(product, text, amount, textLoading);

    expect(result).toEqual(`- ${textLoading}...`);
  });

  it('loadAmount with loaded true and amount', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      loaded: true,
      amount: 1000,
    };
    const text = 'message';
    const amount = '1000';
    const textLoading = 'loading';

    const result = loadAmount(product, text, amount, textLoading);

    expect(result).toEqual(`- ${text} ${amount}`);
  });

  it('loadAmount for else', () => {
    const product = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      loaded: false,
      amount: 1000,
    };
    const text = 'message';
    const amount = null;
    const textLoading = 'loading';

    const result = loadAmount(product, text, amount, textLoading);

    expect(result).toEqual('');
  });

  it('userToken', async () => {
    const auth = TestBed.get(AuthToken);
    userToken(auth);
  });

  it('downloadFile', () => {
    const data = '';
    const spy = spyOn(window, 'open');
    downloadFile(data);
    expect(spy).toHaveBeenCalledWith(data, '_blank');
  });

  it('validateHour for morning', () => {
    const hour = 10;
    const morning = 'morning';
    const afternoon = 'afternoon';
    const night = 'night';

    const result = validateHour(hour, morning, afternoon, night);

    expect(result).toEqual(morning);
  });

  it('validateHour for afternoon', () => {
    const hour = 12;
    const morning = 'morning';
    const afternoon = 'afternoon';
    const night = 'night';

    const result = validateHour(hour, morning, afternoon, night);

    expect(result).toEqual(afternoon);
  });

  it('validateHour for night', () => {
    const hour = 20;
    const morning = 'morning';
    const afternoon = 'afternoon';
    const night = 'night';

    const result = validateHour(hour, morning, afternoon, night);

    expect(result).toEqual(night);
  });

  it('downloadFileWithJS', () => {
    const base64 = '';
    const name = '';
    const extension = '';

    const elementMock = {
      innerHTML: 'my string',
      click: () => {},
      href: () => {},
    };

    const spy = spyOn(document, 'createElement').and.returnValue(
      elementMock as any,
    );

    downloadFileWithJS(base64, name, extension);

    expect(spy).toHaveBeenCalled();
  });

  it('isMobile', () => {
    const result = isMobile();
    expect(result).toBeFalsy();
  });
  // tslint:disable-next-line:max-file-line-count
});
