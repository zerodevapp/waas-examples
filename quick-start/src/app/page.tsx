"use client";
import { parseAbi } from "viem";
import { useConnect } from "wagmi";
import { 
  useCreateKernelClientEOA, 
  useKernelClient, 
  useDisconnectKernelClient, 
  useSendUserOperation
} from "@zerodev/waas";

export default function App() {
  const { connectors } = useConnect();
  const { connect, isPending } = useCreateKernelClientEOA({ version: "v3" });
  const { address, isConnected } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();
  const { data, write, isPending: isUserOpPending, error } = useSendUserOperation({
    paymaster: {
      type: "SPONSOR"
    }
  });
  const tokenAddress = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";
  const abi = parseAbi(["function mint(address _to, uint256 amount) public"]);

  return (
    <div className="flex justify-center items-center h-screen">
      {!isConnected ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={isPending}
          onClick={() => {
            connect({ connector: connectors[0] });
          }}
        >
          {isPending ? 'Connecting...' : 'Create Smart Account'}
        </button>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>{`Smart Account Address: ${address}`}</p>
          <div className="flex flex-row justify-center items-center gap-4">  {/* Updated line */}
            <button onClick={disconnect} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Disconnect
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg" 
              disabled={isUserOpPending}
              onClick={() => {
                write([
                  {
                    address: tokenAddress,
                    abi: abi,
                    functionName: "mint",
                    args: [address, 1],
                    value: BigInt(0),
                  }
                ])
              }}
            >
              {isUserOpPending ? 'Minting...' : 'Mint'}
            </button>
          </div>
          {data && <p>{`UserOp Hash: ${data}`}</p>}
        </div>    
      )}  
    </div>
  );
}
