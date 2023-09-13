export enum Events {
  loaded_custom = 'WINDOW_LOADED_CUSTOM',
  page_view = 'PAGE_VIEW_CUSTOM',
  app_install = 'APP_INSTALLED',
  open_app = 'OPEN_APP',
  close_modal_pwa = 'CLOSE_MODAL_PWA',
  pwa = 'MODE_PWA',
  desktop = 'MODE_DESKTOP',
  home_view = 'dashboard',
}

export function obj_layer(type: EventLabel): object {
  const _obj_layer = {
    eventCategory: 'PB_popular',
    eventAction: 'inicio_event',
    eventLabel: type,
  };
  return _obj_layer;
}

export enum EventLabel {
  saving_account = 'btn_cuenta_ahorro',
  cdt = 'btn_cdt',
}
