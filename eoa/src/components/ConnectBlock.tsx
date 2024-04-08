import { Button, Title } from "@mantine/core";
import {useConnect} from "wagmi";
import {useCreateKernelClientEOA, useKernelClient, useDisconnectKernelClient} from "@zerodev/waas";

export default function ConnectBlock() {
  const { connectors } = useConnect();
  const { connect } = useCreateKernelClientEOA({ version: "v3" });
  const { isConnected } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();

  return (
    <div className="flex flex-col items-center gap-2">
      {!isConnected ? (
        <>
        <Title order={5}>EOA</Title>
        {connectors.map((connector) => (
          <div key={connector.uid} className="w-full">
            <Button
              onClick={() => {
                connect({ connector });
              }}
              fullWidth
              variant="outline"
              style={{ justifyContent: "center" }}
            >
              {connector.name}
            </Button>
          </div>
        ))}
      </>
      ) : (
        <Button
          onClick={() => {
            disconnect();
          }}
          fullWidth
          variant="outline"
          style={{ justifyContent: "center" }}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
}