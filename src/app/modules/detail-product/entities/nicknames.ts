export interface INicknamesState {
  all: INicknamesAll;
  create: IAnswerNicknamesCreate;
  delete: IAnswerNicknamesDelete;
  update: IAnswerNicknamesUpdate;
}

export interface INicknamesAll {
  nicknames?: INickname[];
  success?: boolean;
}

export interface INickname {
  name?: string;
  type?: string;
  accountId?: string;
  accountType?: string;
}

export interface ISendNicknames {
  nickname: INickname;
  oldNickname?: string;
}

export interface IAnswerNicknamesCreate {
  success: boolean;
}

export interface IAnswerNicknamesDelete {
  success: boolean;
}
export interface IAnswerNicknamesUpdate {
  success: boolean;
}
