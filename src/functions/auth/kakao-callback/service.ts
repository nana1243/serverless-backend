import axios from "axios";

const { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, KAKAO_REDIRECT_URI } = process.env;

const kakaoCallbackService = async (request:KakaoCallbackServiceRequest): Promise<KakaoCallbackServiceResponse| null> => {
  const { code } = request;
  const tokenRes = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    null,
    {
      params: {
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        client_secret: KAKAO_CLIENT_SECRET,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
      },
    }
  );
  return tokenRes.data;

}


export default kakaoCallbackService;