import { ZERODEV_BUNDLER_URL, ZERODEV_PAYMASTER_URL } from "@/utils/constants";
import { Button } from "@mantine/core";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  KernelV3ExecuteAbi,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { useSetKernelClient } from "@zerodev/waas";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { EntryPoint } from "permissionless/types";
import { useState } from "react";
import { getAbiItem, http, toFunctionSelector, zeroAddress } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { useChains, usePublicClient } from "wagmi";

export function CreateCustomizedKernelButton() {
  const [isLoading, setIsLoading] = useState(false);
  const publicClient = usePublicClient();
  const chains = useChains();
  const { setKernelClient, error } = useSetKernelClient();

  const createKernelClient = async () => {
    const chain = chains[0];
    if (!publicClient || !chain) return;
    setIsLoading(true);

    try {
      const entryPoint = ENTRYPOINT_ADDRESS_V07 as EntryPoint;
      const generatedAccount = privateKeyToAccount(generatePrivateKey());
      const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
        entryPoint: entryPoint,
        signer: generatedAccount,
      });

      const kernelAccount = await createKernelAccount(publicClient, {
        entryPoint: entryPoint,
        plugins: {
          sudo: ecdsaValidator,
          action: {
            address: zeroAddress,
            selector: toFunctionSelector(
              getAbiItem({ abi: KernelV3ExecuteAbi, name: "execute" })
            ),
          },
        },
      });
      const kernelClient = createKernelAccountClient({
        account: kernelAccount,
        chain: chain,
        bundlerTransport: http(`${ZERODEV_BUNDLER_URL}`),
        entryPoint: entryPoint,
        middleware: {
          sponsorUserOperation: async ({ userOperation }) => {
            const kernelPaymaster = createZeroDevPaymasterClient({
              entryPoint: entryPoint,
              chain: chain,
              transport: http(`${ZERODEV_PAYMASTER_URL}`),
            });
            return kernelPaymaster.sponsorUserOperation({
              userOperation,
              entryPoint: entryPoint,
            });
          },
        },
      });

      setKernelClient(kernelClient);
    } catch (err) {}

    setIsLoading(false);
  };

  return (
    <Button
      disabled={isLoading || !publicClient}
      loading={isLoading}
      variant="outline"
      onClick={createKernelClient}
    >
      Generate Private key
    </Button>
  );
}
