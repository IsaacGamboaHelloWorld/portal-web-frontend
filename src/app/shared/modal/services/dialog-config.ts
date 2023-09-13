import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';

export class DialogConfig<D = IDialogConfig> {
  data?: any | null;
  typeClass?: string = DEFAULT_WIDTH;
  closeOutSide?: boolean = true;
  nameComponent: string = '';
  animation?: boolean = true;
  paddingContainer?: boolean = false;
  align?: string = '';
}

export interface IDialogConfig {
  data: object;
  typeClass: string;
  closeOutSide: boolean;
  nameComponent: string;
  animation: boolean;
  paddingContainer: boolean;
  align: string;
}
