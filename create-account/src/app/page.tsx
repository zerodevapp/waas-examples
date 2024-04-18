"use client";

import { useKernelClient } from "@zerodev/waas";
import { useState, useEffect } from "react"
import ConnectBlock from "@/components/ConnectBlock";
import SmartAccountBlock from "@/components/SmartAccountBlock";

export default function Home() {
  const [hydration, setHydratoin] = useState(false);
  const { isConnected, error } = useKernelClient();

  useEffect(() => {
    setHydratoin(true)
  }, [])

  if (!hydration) return null;

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {isConnected && <SmartAccountBlock /> }
      <ConnectBlock />
    </div>
  );
}
