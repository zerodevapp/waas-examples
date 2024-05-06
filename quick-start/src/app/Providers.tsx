"use client";
import { ZeroDevProvider } from "@zerodev/waas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_APP_ID) {
  throw new Error("Missing NEXT_PUBLIC_ZERODEV_APP_ID");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || "";
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
  })
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ZeroDevProvider appId={appId} chain={sepolia}>
          {children}
        </ZeroDevProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}