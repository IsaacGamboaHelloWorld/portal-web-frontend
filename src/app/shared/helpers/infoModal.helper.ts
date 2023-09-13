export function InfoModal(
  component: any,
  title: string,
  img: string,
  btnCancel: string,
  btnAgree: string,
): any {
  component.title = title;
  component.img = img;
  component.btnCancel = btnCancel;
  component.btnAgree = btnAgree;

  return component;
}
