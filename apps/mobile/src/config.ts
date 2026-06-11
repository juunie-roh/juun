const DEV_URL = "http://localhost:3000/ko";

export const WEB_URL = __DEV__ ? DEV_URL : process.env.NEXT_PUBLIC_BASE_URL!;
