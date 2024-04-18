import { useModal } from "@/hooks";
import { Button } from "@mantine/core";
import {
  useDisconnectKernelClient,
  useKernelClient,
  type KernelVersionType,
} from "@zerodev/waas";

export function ConnectButton({ version }: { version: KernelVersionType }) {
  const { isConnected } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();
  const { openConnectModal } = useModal();

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (isConnected) {
          disconnect();
        } else {
          openConnectModal?.({ version });
        }
      }}
    >
      {isConnected ? "Disconnect" : "Connect"}
    </Button>
  );
}
