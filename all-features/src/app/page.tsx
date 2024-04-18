"use client";
import {
  ConnectButton,
  CreateCustomizedKernelButton,
} from "@/components/Button";
import Navbar from "@/components/Navbar";
import SessionBlock from "@/components/SessionBlock";
import SmartAccountBlock from "@/components/SmartAccountBlock";
import { Flex, Switch, Text } from "@mantine/core";
import { useKernelClient } from "@zerodev/waas";
import { useState } from "react";

export default function Home() {
  const { isConnected } = useKernelClient();
  const [checked, setChecked] = useState(true);

  return (
    <Flex direction="column" w="100vw" h="100vh">
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center absolute top-20 w-full">
          <Switch
            size="lg"
            onLabel="v3"
            offLabel="v2"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            className="mb-4"
          />
          <Text size="xs">Please reconnect after version switched</Text>
        </div>
        <>
          {!isConnected ? (
            <div className="flex flex-row justify-between space-x-4">
              <ConnectButton version={checked ? "v3" : "v2"} />
              <CreateCustomizedKernelButton />
            </div>
          ) : (
            <>
              <SmartAccountBlock />
              <SessionBlock />
            </>
          )}
        </>
      </div>
    </Flex>
  );
}
