import { isNullOrUndefined } from 'util';

export function initGreeting(
  morning: string,
  afternoon: string,
  night: string,
): string {
  const hour = new Date().getHours();
  return !isNullOrUndefined(hour)
    ? validateHour(hour, morning, afternoon, night)
    : morning;
}

export function validateHour(
  hour: number,
  morning: string,
  afternoon: string,
  night: string,
): string {
  if (hour <= 11) {
    return morning;
  } else if (hour > 11 && hour <= 18) {
    return afternoon;
  } else {
    return night;
  }
}
