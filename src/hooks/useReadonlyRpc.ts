import { Connection } from "@solana/web3.js";

const DEFAULT_RPC = "https://api.devnet.solana.com";

export default function useReadonlyRpc() {
    return new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC ?? DEFAULT_RPC);
}
