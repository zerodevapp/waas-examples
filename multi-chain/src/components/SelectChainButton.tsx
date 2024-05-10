"use client";

import { Button, Flex, Menu } from "@mantine/core";
import { useChainId, useChains, useSwitchChain } from "@zerodev/waas";
import { useState } from "react";


export function SelectChainButton() {
  const chainId = useChainId();
  const chains = useChains();
  const [chainSwitching, setChainSwitching] = useState();
  const { switchChain, isPending, error } = useSwitchChain();

  return (
    <Menu>
      <Menu.Target>
        <Button miw={78} px="12px">
          <Flex gap="sm" align="center" mah={24} pr="2px">
            <div
              style={{
                display: "block",
              }}
            >
              {chains.filter((c) => c.id === chainId)[0].name}
            </div>
          </Flex>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Flex direction="column" gap={4}>
          {chains.map((chn: any, idx: number) => {
            const isSelected = chainId === chn.id;
            return (
              <Button
                loading={isPending && chainSwitching === chn.id}
                key={idx}
                onClick={() => {
                  setChainSwitching(chn.id);
                  switchChain({ chainId: chn.id });
                }}
                disabled={isSelected}
              >
                <Flex w="100%" justify="space-between" align="center">
                  <Flex align="center" gap="xs">
                    <Flex>{chn.name}</Flex>
                  </Flex>
                </Flex>
              </Button>
            );
          })}
        </Flex>
      </Menu.Dropdown>
    </Menu>
  );
}
