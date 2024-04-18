import { Modal } from "@mantine/core";
import { type KernelVersionType } from "@zerodev/waas";
import ConnectSigner from "./Connect/ConnectSigner";

export interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
  version: KernelVersionType;
}

export enum ConnectStep {
  Connect = "CONNECT",
  Permission = "PERMISSION",
}

export default function ConnectModal({
  onClose,
  open,
  version,
}: ConnectModalProps) {
  const titleId = "Connect";

  return (
    <Modal
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={titleId}
    >
      <ConnectSigner version={version} />
    </Modal>
  );
}
