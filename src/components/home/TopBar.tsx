import React from "react";
import Image from "next/image";
import { IToken } from "@/store";
import { fetcher } from "@/utils";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import useSWR from "swr";

const topTokenMockup = [
    {
        label: "DONUT",
        code: "donut",
    },
    {
        label: "FACEP",
        code: "facep",
    },
    {
        label: "GRU",
        code: "gru",
    },
    {
        label: "PAWS",
        code: "paws",
    },
    {
        label: "DREW",
        code: "drew",
    },
    {
        label: "BKS",
        code: "bks",
    },
    {
        label: "FONK",
        code: "fonk",
    },
    {
        label: "CHD",
        code: "chd",
    },
    {
        label: "SOP",
        code: "sop",
    },
    {
        label: "SOL",
        code: "sol",
    },
];

export default function TopTokenBar() {
    const {
        data: tokens,
        error,
        isLoading,
        mutate: mutateTokens,
    } = useSWR<IToken[]>(
        `${process.env.NEXT_PUBLIC_API}/bond/top-tokens`,
        fetcher
    );

    return (
        <div className="w-[99vw] max-w-[99vw] relative flex overflow-x-hidden">
            <div className="animate-marquee flex items-center gap-12">
                {tokens?.map((token, idx) => (
                    <span key={idx} className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] relative">
                            <Image
                                src={token.icon}
                                alt="icon"
                                fill
                                sizes="any"
                            />
                        </div>
                        <h1 className="text-[24px]">{token.symbol}</h1>
                    </span>
                ))}
            </div>

            {/* <div className="absolute top-0 animate-marquee2 pl-8 flex items-center gap-12">
                {tokens?.map((token, idx) => (
                    <span key={idx} className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] relative">
                            <Image
                                src={token.icon}
                                alt="icon"
                                fill
                                sizes="any"
                            />
                        </div>
                        <h1 className="text-[24px]">{token.symbol}</h1>
                    </span>
                ))}
            </div> */}
        </div>
    );
}
