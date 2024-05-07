"use client";
import { ZeroDevProvider } from "@zerodev/waas";
import { sepolia } from "viem/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_APP_ID) {
  throw new Error("Missing NEXT_PUBLIC_ZERODEV_APP_ID");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || ""; 

  return (
    <ZeroDevProvider appId={appId} chain={sepolia}>
      {children}
    </ZeroDevProvider>
  )
}