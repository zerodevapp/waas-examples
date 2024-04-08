"use client";
import { ZeroDevProvider } from "@zerodev/waas";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export default function Providers({ children }: { children: ReactNode }) {
  const config = createConfig({
    chains: [sepolia],
    connectors: [injected()],
    transports: {
      [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL || ""),
    },
  });
  const queryClient = new QueryClient();
  const zdAppId = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || "";

  return (
    <MantineProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ZeroDevProvider appId={zdAppId} chain={sepolia}>
            {children}
          </ZeroDevProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
