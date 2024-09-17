"use client";

import ProjectItem from "@/components/ProjectItem";
import { IToken } from "@/store";
import { fetcher } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const CHAINS_SUPPORTED = [
    "ethereum",
    "base",
    "bsc",
    "polygon",
    "linea",
    "arbitrum",
    "zksync",
    "solana",
];

export default function Home() {
    const { publicKey } = useWallet();

    const {
        data: tokens,
        error,
        isLoading,
        mutate: mutateTokens,
    } = useSWR<IToken[]>(
        `${process.env.NEXT_PUBLIC_API}/bond/tokens?owner=${publicKey}`,
        fetcher
    );

    return (
        <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="launch-bg1"></div>

            <div>
                {/* Project list */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tokens?.map((token, idx) => (
                        <ProjectItem key={idx} token={token} />
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]">
                        Show me more
                    </button>
                </div>
            </div>
        </div>
    );
}
