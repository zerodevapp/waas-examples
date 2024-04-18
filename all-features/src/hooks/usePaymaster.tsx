import { PaymasterModalContext } from "@/components/Provider/PaymasterProvider";
import { type PaymasterERC20, type PaymasterSPONSOR } from "@zerodev/waas";
import { useContext, useMemo } from "react";

export function usePaymasterProvider() {
  const { paymasterSetting, updatePaymasterSetting } = useContext(
    PaymasterModalContext
  );

  return {
    paymasterSetting,
    updatePaymasterSetting,
  };
}

export function usePaymasterConfig({
  sessionId,
}: {
  sessionId?: string;
} = {}) {
  const { paymasterSetting } = usePaymasterProvider();

  const setting = paymasterSetting.find(
    (setting) => setting.sessionId === sessionId
  );
  const paymasterConfig = useMemo(() => {
    if (!setting || setting.type === "NO") {
      return undefined;
    } else if (setting.type === "SPONSOR") {
      return {
        type: "SPONSOR",
      } as PaymasterSPONSOR;
    } else if (setting.type === "ERC20") {
      return {
        type: "ERC20",
        gasToken: "6TEST", // Sepolia 6TEST
      } as PaymasterERC20;
    }
  }, [setting]);

  return {
    paymasterConfig,
  };
}
