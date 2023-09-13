function testRegex(regex: RegExp): boolean {
  return regex.test(navigator.userAgent.toLowerCase());
}

export const isiPod = testRegex(/ipod/i);
export const isWebOS = testRegex(/webos/i);
export const isiPhone = testRegex(/iphone/i);
export const isAndroid = testRegex(/android/i);
export const isiDevice = testRegex(/ipad|iphone|ipod/i);
export const isWindowsPhone = testRegex(/windows phone/i);
export const isSamsungBrowser = testRegex(/SamsungBrowser/i);
export const isMobileSafariBrowser = testRegex(/mobile safari/i);

export function isMobile(): boolean {
  return (
    isAndroid ||
    isiPhone ||
    isiPod ||
    isiDevice ||
    isWebOS ||
    isWindowsPhone ||
    isSamsungBrowser ||
    isMobileSafariBrowser
  );
}

export function isIOS(): boolean {
  return isiPhone || isiPod || isWebOS || isiDevice;
}
