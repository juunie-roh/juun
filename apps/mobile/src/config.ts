const DEV_URL = "http://localhost:3000/ko";
const PROD_URL = "https://juun.vercel.app/ko";

export const WEB_URL = __DEV__ ? DEV_URL : PROD_URL;
