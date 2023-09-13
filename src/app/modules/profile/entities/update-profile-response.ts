export class IUpdateProfileResponse {
  data: UpdateProfileResponse;
  error: boolean;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}
export class UpdateProfileResponse {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}
