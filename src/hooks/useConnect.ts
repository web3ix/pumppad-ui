import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";

export default function useConnect() {
    const { visible, setVisible } = useWalletModal();

    const connect = useCallback(() => {
        if (visible) return;

        setVisible(true);
    }, [visible]);

    return {
        connect,
    };
}
