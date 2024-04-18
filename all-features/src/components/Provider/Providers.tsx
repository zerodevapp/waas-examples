"use client";
import { ZERODEV_APP_ID, ZERODEV_BUNDLER_URL } from "@/utils/constants";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ZeroDevProvider } from "@zerodev/waas";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ModalProvider } from "./ModalProvider";
import { PaymasterProvider } from "./PaymasterProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const config = createConfig({
    chains: [sepolia],
    connectors: [injected()],
    transports: {
      [sepolia.id]: http(ZERODEV_BUNDLER_URL),
    },
  });
  const queryClient = new QueryClient();

  return (
    <MantineProvider>
      <Notifications />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ZeroDevProvider appId={ZERODEV_APP_ID} chain={sepolia}>
            <PaymasterProvider>
              <ModalProvider>{children}</ModalProvider>
            </PaymasterProvider>
          </ZeroDevProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
