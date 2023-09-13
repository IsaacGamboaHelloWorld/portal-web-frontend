export function setBase64ToImage(base64: string, imageId: string): void {
  const imgElem = document.getElementById(imageId);
  imgElem.setAttribute('src', base64);
}
