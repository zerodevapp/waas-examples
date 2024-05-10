"use client";
import { ZeroDevProvider, createConfig as createZdConfig } from "@zerodev/waas";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, arbitrum } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_SEPOLIA_APP_ID || !process.env.NEXT_PUBLIC_ZERODEV_ARB_APP_ID) {
  throw new Error("Missing NEXT_PUBLIC_ZERODEV_SEPOLIA_APP_ID or NEXT_PUBLIC_ZERODEV_ARB_APP_ID.");
}

export default function Providers({ children }: { children: ReactNode }) {
  const config = createConfig({
    chains: [arbitrum, sepolia],
    transports: {
      [sepolia.id]: http(),
      [arbitrum.id]: http(),
    },
  });
  const queryClient = new QueryClient();

  const zdConfig = createZdConfig({
    chains: [arbitrum, sepolia],
    transports: {
      [arbitrum.id]: http(),
      [sepolia.id]: http(),
    },
    projectIds: {
      [arbitrum.id]: process.env.NEXT_PUBLIC_ZERODEV_ARB_APP_ID || "",
      [sepolia.id]: process.env.NEXT_PUBLIC_ZERODEV_SEPOLIA_APP_ID || "",
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
