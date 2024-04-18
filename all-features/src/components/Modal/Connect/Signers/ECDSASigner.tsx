import { Loader } from "@mantine/core";

export default function ECDSASigner() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>ECDSA Signer Connecting...</h1>
      {<Loader />}
    </div>
  );
}
