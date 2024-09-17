"use client";
import { useAppStore } from "@/store";
import WalletAdapter from "./WalletAdapter";
import { io } from "socket.io-client";
import { useEffect } from "react";

export default function ProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setSocket } = useAppStore();

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_WS!);

        function onConnect() {
            console.log("connected");
        }

        function onDisconnect() {
            console.log("disconnected");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        setSocket(socket);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return <WalletAdapter>{children}</WalletAdapter>;
}
