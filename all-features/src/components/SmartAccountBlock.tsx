"use client";
import { usePaymasterConfig } from "@/hooks";
import { Button, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useBalance,
  useKernelClient,
  useSendUserOperation,
} from "@zerodev/waas";
import { useEffect } from "react";
import { parseAbi } from "viem";

export default function SmartAccountBlock() {
  const { address } = useKernelClient();
  const { paymasterConfig } = usePaymasterConfig();

  const {
    data: hash,
    write,
    error,
    isPending,
  } = useSendUserOperation({
    paymaster: paymasterConfig,
  });
  const { data } = useBalance();
  const tokenAddress = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";
  const abi = parseAbi(["function mint(address _to, uint256 amount) public"]);

  useEffect(() => {
    if (error) {
      notifications.show({
        color: "red",
        message: "Fail to send userop",
      });
    }
  }, [error]);

  return (
    <>
      <Title order={3}>Smart Account</Title>
      <div className="mb-4">Address: {address}</div>
      {data && (
        <div className="mb-4">
          Balance: {`${data.formatted} ${data.symbol}`}
        </div>
      )}
      <div className="flex flex-row justify-center items-center space-x-4 mt-4">
        <Button
          variant="outline"
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            write([
              {
                address: tokenAddress,
                abi: abi,
                functionName: "mint",
                args: [address, 1],
                value: 0n,
              },
              {
                address: tokenAddress,
                abi: abi,
                functionName: "mint",
                args: [address, 1],
                value: 0n,
              },
            ]);
          }}
        >
          Mint
        </Button>
      </div>
      {hash && <div className="mt-4">UserOp Hash: {hash}</div>}
    </>
  );
}
