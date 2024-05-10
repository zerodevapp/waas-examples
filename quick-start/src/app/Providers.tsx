"use client";
import { http } from "viem"
import { ZeroDevProvider, createConfig } from "@zerodev/waas";
import { sepolia } from "viem/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_APP_ID) {
  throw new Error("Missing NEXT_PUBLIC_ZERODEV_APP_ID");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const PROJECT_ID = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || ""; 

  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http()
    },
    projectIds: {
      [sepolia.id]: PROJECT_ID 
    }
  })

  return (
    <ZeroDevProvider config={config} >
      {children}
    </ZeroDevProvider>
  )
}