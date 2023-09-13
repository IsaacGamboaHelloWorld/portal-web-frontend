import { CatalogDetail, CatalogItemDetail } from '../entities/load-catalog';

export function extractCatalogItemDetailByCode(
  catalogs: CatalogDetail,
  catalogName: string,
  fieldName: string,
  value: any,
  defaultValue: any = '',
): CatalogItemDetail {
  let catalogValue: CatalogItemDetail = {};
  if (!!catalogs && !!catalogs[catalogName]) {
    catalogValue = filterCatalogDetailFromList(
      catalogs[catalogName],
      fieldName,
      value,
      defaultValue,
    );
  }
  return catalogValue;
}

export function filterCatalogDetailFromList(
  catalog: CatalogItemDetail[],
  fieldName: string,
  value: any,
  defaultValue: any = null,
): CatalogItemDetail {
  if (!!catalog) {
    let catalogItemDetail: CatalogItemDetail;
    catalogItemDetail = catalog.find((element) => element[fieldName] === value);
    if (!!catalogItemDetail) {
      return catalogItemDetail;
    }
    catalogItemDetail = catalog.find(
      (element) => element[fieldName] === defaultValue,
    );
    if (!!catalogItemDetail) {
      return catalogItemDetail;
    }
  }

  return {};
}

export function setDefaultValue(value: string, defaultValue: string): string {
  return !!value
    ? value.split(' ').join('') !== ''
      ? value
      : defaultValue
    : defaultValue;
}
