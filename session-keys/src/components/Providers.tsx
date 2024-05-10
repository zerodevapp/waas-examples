"use client";
import { ZeroDevProvider, createConfig as createZdConfig } from "@zerodev/waas";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_APP_ID) {
  throw new Error("Missing NEXT_PUBLIC_ZERODEV_APP_ID");
}

export default function Providers({ children }: { children: ReactNode }) {
  const zdAppId = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || "";
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(`https://rpc.zerodev.app/api/v2/bundler/${zdAppId}`),
    },
  });
  const queryClient = new QueryClient();
  
  const zdConfig = createZdConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(`https://rpc.zerodev.app/api/v2/bundler/${zdAppId}`),
    },
    projectIds: {
      [sepolia.id]: zdAppId,
    }
  })

  return (
    <MantineProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ZeroDevProvider config={zdConfig}>
            {children}
          </ZeroDevProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
