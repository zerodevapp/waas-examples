import { usePaymasterConfig } from "@/hooks";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useKernelClient,
  useSendUserOperationWithSession,
} from "@zerodev/waas";
import { useEffect, useState } from "react";
import { parseAbi } from "viem";

function MintWithSession({
  sessionId,
  pendingCount,
  addPendingCount,
}: {
  sessionId: `0x${string}`;
  pendingCount: number;
  addPendingCount: () => void;
}) {
  const { address } = useKernelClient();
  const tokenAddress = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";
  const abi = parseAbi(["function mint(address _to, uint256 amount) public"]);
  const { paymasterConfig } = usePaymasterConfig({ sessionId });
  const { data, write, error } = useSendUserOperationWithSession({
    sessionId,
    paymaster: paymasterConfig,
  });

  useEffect(() => {
    if (pendingCount === 0) {
      write([
        {
          address: tokenAddress,
          abi: abi,
          functionName: "mint",
          args: [address, 1],
          value: 0n,
        },
      ]);
    }
  }, [pendingCount]);

  useEffect(() => {
    if (data) {
      notifications.show({
        color: "green",
        message: `UserOp Hash: ${data}`,
      });
      addPendingCount();
    } else if (error) {
      notifications.show({
        color: "red",
        message: "Fail to send userop",
      });
      addPendingCount();
    }
  }, [data, error]);

  return <></>;
}

export function ParallelMintButton({
  sessionId,
}: {
  sessionId: `0x${string}`;
}) {
  const [pendingCount, setPendingCount] = useState(5);

  const addPendingCount = () => setPendingCount((c) => c + 1);

  return (
    <>
      <MintWithSession
        sessionId={sessionId}
        pendingCount={pendingCount}
        addPendingCount={addPendingCount}
      />
      <MintWithSession
        sessionId={sessionId}
        pendingCount={pendingCount}
        addPendingCount={addPendingCount}
      />
      <MintWithSession
        sessionId={sessionId}
        pendingCount={pendingCount}
        addPendingCount={addPendingCount}
      />
      <MintWithSession
        sessionId={sessionId}
        pendingCount={pendingCount}
        addPendingCount={addPendingCount}
      />
      <MintWithSession
        sessionId={sessionId}
        pendingCount={pendingCount}
        addPendingCount={addPendingCount}
      />
      <Button
        variant="outline"
        loading={pendingCount !== 5}
        onClick={() => {
          setPendingCount(0);
        }}
      >
        Parallel Mint With Session
      </Button>
    </>
  );
}
