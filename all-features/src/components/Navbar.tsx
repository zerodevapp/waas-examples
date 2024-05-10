import { Flex } from "@mantine/core";
import { useKernelClient } from "@zerodev/waas";
import { ConnectButton, PaymasterButton, SelectChainButton } from "./Button";

export default function Navbar() {
  const { isConnected } = useKernelClient();

  return (
    <Flex
      w="100vw"
      justify={"space-between"}
      px="lg"
      py={15}
      wrap="wrap"
      align="center"
    >
      <Flex justify="flex-end" miw={20} gap="sm" w="100%">
        {isConnected && (
          <>
            <PaymasterButton />
            <SelectChainButton />
            <ConnectButton version="v3" />
          </>
        )}
      </Flex>
    </Flex>
  );
}
