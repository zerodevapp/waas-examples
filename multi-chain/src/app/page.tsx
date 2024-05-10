"use client";

import { useKernelClient } from "@zerodev/waas";
import ConnectBlock from "@/components/ConnectBlock";
import SmartAccountBlock from "@/components/SmartAccountBlock";
import { SelectChainButton } from "@/components/SelectChainButton";

export default function Home() {
  const { isConnected } = useKernelClient();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {isConnected ? (
        <div className="absolute top-0 right-0 p-4">
          <div className="flex gap-2">
            <SelectChainButton />
            <ConnectBlock />
          </div>
        </div>
      ) : (
        <ConnectBlock />
      )}
      {isConnected && <SmartAccountBlock />}
    </div>
  );
}
