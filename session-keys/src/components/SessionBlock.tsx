"use client";
import { Button, Title } from "@mantine/core";
import {
  useKernelClient,
  useSendUserOperationWithSession,
  useSessions,
  useCreateSession,
} from "@zerodev/waas";
import { parseAbi, parseGwei } from "viem";
import { toGasPolicy, toSudoPolicy } from "@zerodev/permissions/policies";

function SessionInfo({ sessionId }: { sessionId: `0x${string}` }) {
  const { address } = useKernelClient();
  const tokenAddress = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";
  const abi = parseAbi(["function mint(address _to, uint256 amount) public"]);
  const { data, write, isDisabled, isPending, error } =
    useSendUserOperationWithSession({
      sessionId,
      paymaster: {
        type: "SPONSOR",
      }
    });

  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-4 mt-4">
        {sessionId && <p>{`Permission ID: ${sessionId}`}</p>}
        <Button
          variant="outline"
          disabled={isDisabled}
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
            ]);
          }}
        >
          Mint With Session
        </Button>
      </div>
      {data && <div className="mt-4">MintWithSession UserOp Hash: {data}</div>}
    </>
  );
}

export default function SessionBlock() {
  const { write, isPending } = useCreateSession();
  const sessions = useSessions();

  return (
    <>
      <Title order={3}>Session</Title>
      <Button
        variant="outline"
        loading={isPending}
        disabled={isPending}
        onClick={() =>
          write({
            policies: [
              toSudoPolicy({}),
              toGasPolicy({
                allowed: parseGwei("1000000000"),
              })
            ],
          })
        }
      >
        Create Session
      </Button>
      {sessions &&
        Object.keys(sessions).map((sId, index) => (
          <SessionInfo key={index} sessionId={sId as `0x${string}`} />
        ))}
    </>
  );
}
