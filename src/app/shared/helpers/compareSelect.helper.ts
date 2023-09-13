export function compareSelect(
  value1: any,
  value2: any,
  property: string,
): boolean {
  return value1 && value2
    ? value1[property] === value2[property]
    : value1 === value2;
}
