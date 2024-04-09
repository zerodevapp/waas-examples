"use client";
import { useKernelClient, useSendUserOperation } from "@zerodev/waas";
import { Button, Title } from "@mantine/core";
import { parseAbi } from "viem";

export default function SmartAccountBlock() {
  const { address } = useKernelClient();
  const { data, write, isPending } = useSendUserOperation();
  const nftAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
  const abi = parseAbi(["function mint(address _to) public"]);

  return (
    <>
      <Title order={3}>Smart Account</Title>
      <div className="mb-4">Address: {address}</div>
      <div className="flex flex-row justify-center items-center space-x-4 mt-4">
        <Button
          variant="outline"
          disabled={isPending || !write}
          loading={isPending}
          onClick={() => {
            write([
              {
                address: nftAddress,
                abi: abi,
                functionName: "mint",
                args: [address],
                value: 0n,
              }
            ]);
          }}
        >
          Mint
        </Button>
      </div>
      {data && <div className="mt-4">UserOp Hash: {data}</div>}
    </>
  );
}
