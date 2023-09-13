export function initialName(names: string): string {
  const initials = names.split(' ');
  if (!!initials) {
    const one = !!initials[0] ? initials[0][0] : '';
    const two = !!initials[1] ? initials[1][0] : '';
    return one + two.toUpperCase();
  }
  return '';
}
