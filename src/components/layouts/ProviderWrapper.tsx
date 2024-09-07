"use client";
import WalletAdapter from "./WalletAdapter";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletAdapter>
              {children}
    </WalletAdapter>
  );
}
