import { Button, Title,  Flex, TextInput } from "@mantine/core";
import {useConnect} from "wagmi";
import {
  useKernelClient, 
  useDisconnectKernelClient,
  useCreateKernelClientEOA, 
  useCreateKernelClientSocial,
  useCreateKernelClientPasskey
} from "@zerodev/waas";
import { useState } from "react";

function EOASigner() {
  const { connectors } = useConnect();
  const { connect, isPending } = useCreateKernelClientEOA({ version: "v3" });
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
              disabled={isPending}
              onClick={() =>  connect({ connector })}
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

function PasskeySigner() {
  const [username, setUsername] = useState("");
  const { connectRegister, connectLogin, isPending } = useCreateKernelClientPasskey(
    { version: "v3" }
  );

  return (
    <Flex justify="between" align="start" className="w-4/5">
      <Flex
        flex={1}
        direction="column"
        align="center"
        className="pr-10 w-full" // Add right padding to the Register block
      >
        <Title order={5}>Register</Title>
        <TextInput
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          placeholder="Passkey Name"
          className="mb-1 p-1"
        />
        <Button
          variant="outline"
          style={{ padding: "3px" }}
          loading={isPending}
          disabled={isPending || !username}
          onClick={() =>  connectRegister({ username })}
        >
          Register
        </Button>
      </Flex>
      <Flex
        flex={1}
        direction="column"
        align="center"
        className="pl-10" // Add left padding to the Login block
      >
        <Title order={5}>Login</Title>
        <Button
          className="mt-5"
          variant="outline"
          style={{ padding: "3px" }}
          loading={isPending}
          disabled={isPending}
          onClick={() => connectLogin()}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default function ConnectBlock() {
  const [signerOption, setSignerOption] = useState("");
  const { isConnected } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();
  const { login, isPending } = useCreateKernelClientSocial(
    { version: "v3" }
  );

  return (
    <>
      {isConnected ? (
        <Button variant="outline" onClick={() => disconnect()}>Disconnet</Button>
      ) : (
        <>
          {signerOption === "" ? (
            <Flex flex={1} justify="between" align="center" className="space-x-4">
              <Button onClick={() => setSignerOption("eoa")}>EOA</Button>
              <Button onClick={() => setSignerOption("passkey")}>Passkey</Button>
              <Button loading={isPending} onClick={() => login("google")}>Social</Button>
            </Flex> 
          ) : (
            <Flex direction="column" justify="between" align="center" className="space-y-4 w-full">
              {signerOption === "eoa" && <EOASigner />}
              {signerOption === "passkey" && <PasskeySigner />}
              <Button onClick={() => setSignerOption("")}>Back</Button>
            </Flex>
          )}
        </>
      )}
    </>
  )
}