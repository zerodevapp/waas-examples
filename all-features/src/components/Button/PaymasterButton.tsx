import { useModal } from "@/hooks";
import { Button } from "@mantine/core";

export function PaymasterButton() {
  const { openPaymasterModal } = useModal();

  return (
    <Button
      variant="outline"
      onClick={() => {
        openPaymasterModal?.();
      }}
    >
      Set Paymaster
    </Button>
  );
}
