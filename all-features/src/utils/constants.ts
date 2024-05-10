export const ZERODEV_APP_ARB_ID = process.env.NEXT_PUBLIC_ZERODEV_ARB_APP_ID || "";

export const ZERODEV_APP_SEPOLIA_ID = process.env.NEXT_PUBLIC_ZERODEV_SEPOLIA_APP_ID || "";

export const getBundler = (chainId: number) => {
  if (chainId === 42161) {
    return `https://rpc.zerodev.app/api/v2/bundler/${ZERODEV_APP_ARB_ID}`;
  } else return `https://rpc.zerodev.app/api/v2/bundler/${ZERODEV_APP_SEPOLIA_ID}`;
};

export const getPaymaster = (chainId: number) => {
  if (chainId === 42161) {
    return `https://rpc.zerodev.app/api/v2/paymaster/${ZERODEV_APP_ARB_ID}`;
  } else if (chainId === 11155111) {
    return `https://rpc.zerodev.app/api/v2/paymaster/${ZERODEV_APP_SEPOLIA_ID}`;
  }
  return "";
};
