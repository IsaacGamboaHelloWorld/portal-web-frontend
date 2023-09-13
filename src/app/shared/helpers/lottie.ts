import * as lottie from 'lottie-web';

export function lottieAnimation(
  element: any,
  path: string,
  renderer: string = 'svg',
  loop: boolean = false,
  autoplay: boolean = true,
): void {
  // @ts-ignore
  lottie.loadAnimation({
    container: element,
    renderer,
    loop,
    autoplay,
    path,
  });
}
