"use client";
import { 
  getBundler,
  ZERODEV_APP_ARB_ID,
  ZERODEV_APP_SEPOLIA_ID
} from "@/utils/constants";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ZeroDevProvider, createConfig as createZdConfig } from "@zerodev/waas";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, arbitrum } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ModalProvider } from "./ModalProvider";
import { PaymasterProvider } from "./PaymasterProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const config = createConfig({
    chains: [sepolia, arbitrum],
    connectors: [injected()],
    transports: {
      [sepolia.id]: http(getBundler(sepolia.id)),
      [arbitrum.id]: http(getBundler(arbitrum.id)),
    },
  });
  const queryClient = new QueryClient();

  const zdConfig = createZdConfig({
    chains: [sepolia, arbitrum],
    transports: {
      [sepolia.id]: http(getBundler(sepolia.id)),
      [arbitrum.id]: http(getBundler(arbitrum.id))
    },
    projectIds: {
      [sepolia.id]: ZERODEV_APP_SEPOLIA_ID,
      [arbitrum.id]: ZERODEV_APP_ARB_ID
    }
  })

  return (
    <MantineProvider>
      <Notifications />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ZeroDevProvider config={zdConfig}>
            <PaymasterProvider>
              <ModalProvider>{children}</ModalProvider>
            </PaymasterProvider>
          </ZeroDevProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
