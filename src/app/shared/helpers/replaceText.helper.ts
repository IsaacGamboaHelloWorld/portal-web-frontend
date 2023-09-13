export function replaceText(el: string): string {
  el = el.replace(/^\s+|\s+$/g, '');
  el = el.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    el = el.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  el = el
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return el;
}
