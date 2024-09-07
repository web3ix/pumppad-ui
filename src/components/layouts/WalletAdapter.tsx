"use client"; 
import { ReactNode, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
require('@solana/wallet-adapter-react-ui/styles.css');


interface WalletProviderProps {
    children: ReactNode;
}

export default function WalletAdapter(props: WalletProviderProps) {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{props.children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
