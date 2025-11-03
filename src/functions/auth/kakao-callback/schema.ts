interface KakaoCallbackServiceRequest {
  code: string;
}

interface KakaoCallbackServiceResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  scope: string;
}
