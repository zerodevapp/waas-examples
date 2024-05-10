import { Button, Flex, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useChainId, useChains, useSwitchChain } from "@zerodev/waas";
import { useEffect, useState } from "react";

export const CustomChevronDown = () => (
  <svg fill="none" height="7" width="14" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      xmlns="http://www.w3.org/2000/svg"
    ></path>
  </svg>
);

export function SelectChainButton() {
  const chainId = useChainId();
  const chains = useChains();
  const [chainSwitching, setChainSwitching] = useState();
  const { switchChain, isPending, error } = useSwitchChain();

  useEffect(() => {
    if (error) {
      notifications.show({
        color: "red",
        message: error?.message || "Switch chain failed",
      });
    }
  }, [error]);

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
            <Flex miw={14}>
              <CustomChevronDown />
            </Flex>
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
