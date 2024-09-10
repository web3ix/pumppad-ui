"use client";

import HighlightProject from "@/components/HighlightProject";
import ProjectItem from "@/components/ProjectItem";
import SupportNetwork from "@/components/home/SupportNetwork";
import TopTokenBar from "@/components/home/TopBar";
import useConnect from "@/hooks/useConnect";
import { IToken, ITrade } from "@/store";
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
    const { connect } = useConnect();

    const { data, error, isLoading, mutate } = useSWR<{
        tokens: IToken[];
        trades: ITrade[];
        kingOfHill: IToken[];
    }>(`${process.env.NEXT_PUBLIC_API}/bond/stats`, fetcher);

    return (
        <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="flex flex-col gap-[22px] items-center my-20">
                <h1 className="text-[32px] md:leading-[170px] md:text-[200px] primary-text-gradient text-center">
                    PUMPPAD
                </h1>
                <div className="text-center text-[15px] md:text-[20px] text-[#94A3B8]">
                    <div className="mb-2">
                        From Building to Launching in just a few steps
                    </div>
                    <div>Powered by DEVHUB AI</div>
                </div>
                <div className="flex flex-col gap-[22px] font-vortex">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                        {!publicKey && (
                            <button
                                onClick={connect}
                                className="flex items-center gap-[11px] py-2.5 px-6 btn-primary"
                            >
                                <span>Connect wallet</span>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/wallet.svg"
                                        alt="wallet"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        )}

                        <Link href="/create" passHref legacyBehavior>
                            <button className="flex items-center gap-[11px] py-2.5 px-[18px] btn-secondary">
                                <span> Launch your token now</span>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/launch.svg"
                                        alt="launch"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>

                        <button className="hidden md:flex items-center gap-[11px] py-2 px-6 btn-primary">
                            <span>Product order</span>
                            <div className="w-[18px] h-[18px] relative">
                                <Image
                                    src="/icons/order.svg"
                                    alt="order"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-[19px] text-[#000000]">
                        <button className="flex items-center justify-center gap-[11px] p-2.5 btn-normal">
                            <span> How to launch</span>
                            <div className="w-[18px] h-[18px] relative">
                                <Image
                                    src="/icons/how-to-launch.svg"
                                    alt="how-to-launch"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </button>

                        <button className="flex items-center justify-center gap-[11px] p-2.5 btn-normal">
                            <span>Product order</span>
                            <div className="w-[18px] h-[18px] relative">
                                <Image
                                    src="/icons/order.svg"
                                    alt="order"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </button>

                        <button className="flex md:hidden items-center justify-center gap-[11px] p-2.5 btn-normal">
                            <span>Agent support</span>
                            <div className="w-[18px] h-[18px] relative">
                                <Image
                                    src="/icons/support.svg"
                                    alt="support"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* <TopBar /> */}
            <div className="mb-[40px] md:mb-[100px]">
                <div className="mb-[56px]">
                    <SupportNetwork />
                </div>
                <TopTokenBar />

                {/* <div className="w-[99vw] max-w-[99vw] flex overflow-x-hidden">
                    <div className="py-12 animate-marquee whitespace-nowrap">
                        <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#0038FF]">
                            Trending
                        </button>
                        <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                            Top
                        </button>
                        <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                            Rasing
                        </button>
                        <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                            New
                        </button>
                        <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                            Finished
                        </button>
                    </div>

                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#0038FF]">
                        Trending
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Top
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Rasing
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        New
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Finished
                    </button>
                    <input
                        className="min-w-[200px] flex-1 col-span-2 font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient"
                        placeholder="Search"
                    />
                </div> */}
            </div>

            {/* King of hill */}
            <HighlightProject token={data?.kingOfHill?.[0]} />

            {/* Filters */}
            <div className="w-full">
                <div className="w-full max-w-full flex gap-2 items-center overflow-x-scroll">
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#0038FF]">
                        Trending
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Top
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Rasing
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        New
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Finished
                    </button>
                    <input
                        className="min-w-[200px] flex-1 col-span-2 font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient"
                        placeholder="Search"
                    />
                </div>
                <div className="w-full max-w-full flex gap-2 items-center mt-2 overflow-x-scroll">
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Age
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        Min progress
                    </button>
                    <button className="min-w-[140px] 2xl:min-w-[250px] font-vortex md:block py-4 rounded-md text-sm font-semibold bg-[#000000] box-shadow-stats border-gradient">
                        max progress
                    </button>
                </div>
            </div>
            {/* TODO */}

            {/* Project list */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.tokens.map((token, idx) => (
                    <ProjectItem key={idx} token={token} />
                ))}
            </div>
        </div>
    );
}
