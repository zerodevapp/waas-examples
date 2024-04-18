import { Button, Title } from "@mantine/core";
import {
  useCreateKernelClientEOA,
  type KernelVersionType,
} from "@zerodev/waas";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import ECDSASigner from "./Signers/ECDSASigner";
import PasskeySigner from "./Signers/PasskeySigner";

export enum SignerType {
  None = "NONE",
  ECDSA = "ECDSA",
  Passkey = "PASSKEY",
}

export default function ConnectSigner({
  version,
}: {
  version: KernelVersionType;
}) {
  const { connectors } = useConnect();
  const [signerStep, setSignerStep] = useState<SignerType>(SignerType.None);
  const { connect, error } = useCreateKernelClientEOA({ version });

  useEffect(() => {
    if (error) setSignerStep(SignerType.None);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-2">
      {signerStep === SignerType.None && (
        <>
          <Title order={5}>EOA</Title>
          {connectors.map((connector) => (
            <div key={connector.uid} className="w-full">
              <Button
                onClick={() => {
                  connect({ connector });
                  setSignerStep(SignerType.ECDSA);
                }}
                fullWidth
                variant="outline"
                style={{ justifyContent: "center" }}
              >
                {connector.name}
              </Button>
            </div>
          ))}
          <Title order={5}>Passkey</Title>
          <Button
            variant="outline"
            style={{ justifyContent: "center" }}
            onClick={() => setSignerStep(SignerType.Passkey)}
          >
            Use Passkey
          </Button>
        </>
      )}
      {signerStep === SignerType.ECDSA && <ECDSASigner />}
      {signerStep === SignerType.Passkey && <PasskeySigner version={version} />}
    </div>
  );
}
