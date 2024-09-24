"use client";

import ProjectItem from "@/components/ProjectItem";
import Skeleton from "@/components/Skeleton";
import TopTokenBar from "@/components/home/TopBar";
import { IToken } from "@/store";
import { DEFAULT_LIMIT, fetcher } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";

export default function MyTokenPage() {
    const { publicKey } = useWallet();

    const { data, mutate, size, setSize, isLoading } = useSWRInfinite(
        (index) =>
            `${process.env.NEXT_PUBLIC_API}/bond/my-tokens?owner=${publicKey}&take=${DEFAULT_LIMIT}&skip=${index * DEFAULT_LIMIT}`,
        fetcher
    );

    const isLoadMore = useMemo(
        () => size * DEFAULT_LIMIT < data?.[data.length - 1]?.total,
        [size, data]
    );

    const onLoadMore = () => {
        setSize((prev) => prev + 1);
    };

    const tokens = useMemo<IToken[]>(
        () => (!data ? [] : data?.map((page) => page.data)?.flat(1)),
        [data]
    );

    return (
        <>
            <TopTokenBar />

            <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
                <div className="launch-bg1"></div>

                {isLoading ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {new Array(6).fill("").map((_, idx) => (
                            <Skeleton key={idx} h="200px" />
                        ))}
                    </div>
                ) : (
                    <div>
                        {/* Project list */}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {tokens.map((token, idx) => (
                                <ProjectItem
                                    key={idx}
                                    token={token}
                                    showSetting={true}
                                    // mutate={mutate}
                                />
                            ))}
                        </div>

                        {isLoadMore && (
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={onLoadMore}
                                    className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]"
                                >
                                    Show me more
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
