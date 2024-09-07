"use client";
import Image from "next/image";
import Link from "next/link";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Header() {
    const { publicKey } = useWallet();
    const { visible, setVisible } = useWalletModal();

    const handleConnect = useCallback(() => {
        if (visible) return;
    }, [publicKey, visible]);

    return (
        <div className="px-[20px] md:px-[100px] py-[20px] flex justify-between items-center">
            <Link href="/" passHref legacyBehavior>
                <div className="cursor-pointer w-[120px] h-[32px] relative">
                    <Image src="/logo-w-text.png" alt="logo" fill sizes="any" />
                </div>
            </Link>

            <div className="items-center justify-center hidden md:flex gap-10 text-[#94A3B8] text-sm">
                <Link href="/solutions">
                    <h1>Solutions</h1>
                </Link>
                <Link href="/vip-package">
                    <h1>VIP Package</h1>
                </Link>
                <Link href="/tokenomics">
                    <h1>Tokenomics</h1>
                </Link>
                <Link href="/roadmap">
                    <h1>Roadmap</h1>
                </Link>
            </div>

            <div className="flex items-center">
                <div className="flex gap-2">
                    <Link href="/docs" passHref legacyBehavior>
                        <button className="p-[8px] border border-[#8a8edc66] rounded-md text-sm flex justify-center items-center font-semibold">
                            Documents
                        </button>
                    </Link>
                    <div className="border-gradient md:hidden p-[8px] rounded-md flex justify-center items-center md:bg-[#0038FF]">
                        <div className="w-[18px] h-[18px] relative ">
                            <Image
                                src="/icons/menu.svg"
                                alt="menu"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div>

                    <button
                        className="hidden md:block py-2 px-6 rounded-md text-sm justify-center items-center font-semibold md:bg-[#0038FF]"
                        onClick={() => setVisible(true)}
                    >
                        Connect
                    </button>
                </div>
            </div>
        </div>
    );
}
