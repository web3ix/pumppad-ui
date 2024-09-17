"use client";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import useConnect from "@/hooks/useConnect";
import { Toaster } from "react-hot-toast";

export default function Header() {
    const { publicKey } = useWallet();
    const { connect } = useConnect();

    return (
        <div className="px-5 md:px-[120px] py-6 flex justify-between items-center relative">
            <Toaster />
            <div className="md:hidden absolute top-0 left-0 right-0 bg-mobile-bg1 min-h-[390px] -z-50"></div>
            <div className="hidden md:block absolute top-0 left-0 right-0 bg-bg1 min-h-[1080px] -z-50 bg-no-repeat bg-cover bg-center"></div>

            <Link href="/">
                <div className="cursor-pointer w-[177px] h-[40px] md:w-[208px] md:h-[47px] relative">
                    <Image src="/logo-w-text.png" alt="logo" fill sizes="any" />
                </div>
            </Link>

            <div className="items-center justify-center hidden md:flex gap-10 text-[#94A3B8] text-sm">
                <Link href="/">
                    <h1>Home</h1>
                </Link>
                <Link href="/create">
                    <h1>Launch</h1>
                </Link>
                <Link href="https://t.me/pumppad" target="_blank">
                    <h1>Telegram</h1>
                </Link>
                <Link href="https://x.com/pumppad_vip" target="_blank">
                    <h1>Twitter</h1>
                </Link>
            </div>

            <div className="flex items-center">
                <div className="flex gap-2">
                    <Link href="https://docs.pumppad.vip/" target="_blank">
                        <button className="py-2 px-3 border border-[#334155] rounded-md text-[#F1F5F9] text-sm flex justify-center items-center font-semibold">
                            Documents
                        </button>
                    </Link>
                    <div
                        id="menu-icon"
                        className="cursor-pointer border-gradient md:hidden py-2 px-3 rounded-md flex justify-center items-center md:bg-[#0038FF]"
                    >
                        <div className="w-[18px] h-[18px] relative ">
                            <Image
                                src="/icons/menu.svg"
                                alt="menu"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div>

                    {!publicKey ? (
                        <button
                            className="hidden md:block py-2 px-3 rounded-md text-sm justify-center items-center font-semibold md:bg-[#0038FF]"
                            onClick={connect}
                        >
                            Connect
                        </button>
                    ) : (
                        <Link href="/profile">
                            <button className="hidden md:block py-2 px-3 rounded-md text-sm justify-center items-center font-semibold md:bg-[#0038FF]">
                                {`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-3)}`}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
