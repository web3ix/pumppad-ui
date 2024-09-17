"use client";

import HighlightProject from "@/components/HighlightProject";
import ProjectItem from "@/components/ProjectItem";
import SupportNetwork from "@/components/home/SupportNetwork";
import TopTokenBar from "@/components/home/TopBar";
import useConnect from "@/hooks/useConnect";
import { IToken, ITrade, useAppStore } from "@/store";
import { fetcher, sliceString } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
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

    const { data: kingOfHill } = useSWR<IToken>(
        `${process.env.NEXT_PUBLIC_API}/bond/king-of-hill`,
        fetcher
    );

    const {
        data: tokens,
        error,
        isLoading,
        mutate: mutateTokens,
    } = useSWR<IToken[]>(`${process.env.NEXT_PUBLIC_API}/bond/tokens`, fetcher);

    const { socket } = useAppStore();

    useEffect(() => {
        if (!socket || !tokens || !mutateTokens) return;

        socket.on("new-token", (payload) => {
            const exist = tokens.find((token) => token.id === payload.id);
            if (!exist) {
                mutateTokens([...tokens, payload]);
            }
        });
    }, [socket, tokens, mutateTokens]);

    return (
        <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="flex flex-col gap-[22px] items-center my-20">
                <h1 className="text-[32px] md:leading-[170px] md:text-[200px] primary-text-gradient text-center">
                    PUMP PAD
                </h1>
                <div className="text-center text-[15px] md:text-[20px] text-[#94A3B8]">
                    <div className="mb-2">
                        From building to launching in just a few steps
                    </div>
                </div>
                <div className="flex flex-col gap-5 font-vortex">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                        {!publicKey && (
                            <button
                                onClick={connect}
                                className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-primary"
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

                        <Link href="/create">
                            <button className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-secondary">
                                <h1 className="text-18px">
                                    Launch your token now
                                </h1>
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

                        <Link
                            href="https://t.me/pump_agent"
                            target="_blank"
                            passHref
                            legacyBehavior
                        >
                            <button className="hidden md:flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-primary">
                                <span>Product order</span>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/order.png"
                                        alt="order"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 text-[#000000]">
                        <Link
                            href="https://docs.pumppad.vip/practice-on-pump-pad/launching-for-builders"
                            target="_blank"
                        >
                            <button className="flex items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
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
                        </Link>

                        <Link
                            href="https://t.me/pump_agent"
                            target="_blank"
                            passHref
                            legacyBehavior
                        >
                            <button className="flex md:hidden items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
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
                        </Link>

                        <Link href="https://t.me/pump_agent" target="_blank">
                            <button className="flex items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
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
                        </Link>
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
            <HighlightProject token={kingOfHill} />

            {/* Filters */}
            <div className="w-full">
                <div className="w-full max-w-full flex gap-2 items-center overflow-x-scroll">
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#0038FF]">
                        <h1 className="text-[18px]">Trending</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/trending.svg"
                                alt="trending"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Top</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/star.svg"
                                alt="star"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Raising</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/raising.svg"
                                alt="raising"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">New</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/new.svg"
                                alt="new"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>

                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Finished</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/mark.svg"
                                alt="mark"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>

                    <div className="flex-1 relative">
                        <div className="absolute top-1/2 left-[24px] -translate-y-1/2">
                            <div className="w-[20px] h-[20px] relative">
                                <Image
                                    src="/icons/search.svg"
                                    alt="search"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </div>
                        <input
                            className="pl-14 min-w-[200px] col-span-2 font-vortex md:block py-4 rounded-md text-[20px] font-semibold bg-[#000000] box-shadow-stats border-gradient"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className="w-full max-w-full h-full flex gap-2 items-center mt-2 overflow-x-scroll">
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Age</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/arrow-down.svg"
                                alt="arrow-down"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Min progress</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/arrow-down.svg"
                                alt="arrow-down"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md bg-[#000000] box-shadow-stats border-gradient">
                        <h1 className="text-[18px]">Max progress</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/arrow-down.svg"
                                alt="arrow-down"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                </div>
            </div>
            {/* TODO */}

            {/* Project list */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {tokens?.map((token, idx) => (
                    <ProjectItem key={idx} token={token} />
                ))}
            </div>
        </div>
    );
}
