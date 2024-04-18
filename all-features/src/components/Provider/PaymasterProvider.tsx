import { useSessions } from "@zerodev/waas";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PaymasterType = "NO" | "SPONSOR" | "ERC20";
export type PaymasterSetting = {
  sessionId?: string;
  type: PaymasterType;
};

interface PaymasterModalContextValue {
  paymasterSetting: PaymasterSetting[];
  updatePaymasterSetting: (setting: PaymasterSetting) => void;
}

export const PaymasterModalContext = createContext<PaymasterModalContextValue>({
  paymasterSetting: [],
  updatePaymasterSetting: () => {},
});

interface PaymasterModalProviderProps {
  children: ReactNode;
}

export function PaymasterProvider({ children }: PaymasterModalProviderProps) {
  const [paymasterSetting, setPaymasterSetting] = useState<PaymasterSetting[]>([
    { type: "SPONSOR" as PaymasterType },
  ]);
  const sessions = useSessions();

  const updatePaymasterSetting = useCallback((setting: PaymasterSetting) => {
    setPaymasterSetting((prev) => {
      const index = prev.findIndex(
        (item) => item.sessionId === setting.sessionId
      );
      if (index === -1) {
        return prev.concat(setting);
      }
      prev[index] = setting;
      return prev;
    });
  }, []);

  useEffect(() => {
    const updatePaymaster = () => {
      if (!sessions || Object.keys(sessions).length === 0) return;
      const array = Array.from([{ type: "SPONSOR" as PaymasterType }]).concat(
        Object.keys(sessions).map((sessionId) => ({
          sessionId: sessionId,
          type: "SPONSOR" as PaymasterType,
        }))
      );
      setPaymasterSetting(array);
    };

    updatePaymaster();
  }, [sessions]);

  return (
    <PaymasterModalContext.Provider
      value={useMemo(
        () => ({
          paymasterSetting,
          updatePaymasterSetting,
        }),
        [paymasterSetting, updatePaymasterSetting]
      )}
    >
      {children}
    </PaymasterModalContext.Provider>
  );
}
