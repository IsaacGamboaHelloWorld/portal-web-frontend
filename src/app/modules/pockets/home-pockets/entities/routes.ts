export enum NavigatePockets {
  new_pocket = '/bolsillos/nuevo-bolsillo',
  move_money = '/bolsillos/mover-dinero',
  success_move_money = '/bolsillos/mover-dinero/resultado',
  edit_money = '/bolsillos/editar-bolsillo',
  pockets = '/bolsillos',
}

export interface INavigatePockets {
  new_pocket: string;
  pockets: string;
  move_money: string;
  edit_money: string;
  success_move_money: string;
}
