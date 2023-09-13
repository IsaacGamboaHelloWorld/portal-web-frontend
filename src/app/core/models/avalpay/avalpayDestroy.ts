export interface IDestroyPaymentRequest {
  transaction: string;
}

export interface IDestroyPaymentResponse {
  approvalId: number;
  requestId: number;
  success: boolean;
  errorMessage?: string;
}
