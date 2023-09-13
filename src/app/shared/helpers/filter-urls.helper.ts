export const isUrl = (value: string, urls: string[]): boolean =>
  urls.some((urlExclude) => value.includes(urlExclude));
