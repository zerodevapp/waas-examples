export const ZERODEV_APP_ID = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || "";

export const ZERODEV_BUNDLER_URL = `https://rpc.zerodev.app/api/v2/bundler/${ZERODEV_APP_ID}`;

export const ZERODEV_PAYMASTER_URL = `https://rpc.zerodev.app/api/v2/paymaster/${ZERODEV_APP_ID}`;
