import { ITrade } from "@/store";
import { calcLiquidity, fetcher, numberWithCommas } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

export default function TopTokenBar() {
    const {
        data: trades,
        error,
        isLoading,
        mutate: mutateTrades,
    } = useSWR<ITrade[]>(
        `${process.env.NEXT_PUBLIC_API}/bond/recent-trades`,
        fetcher
    );

    return (
        <div className="w-[99vw] max-w-[99vw] relative flex overflow-x-hidden">
            <div className="animate-marquee flex items-center gap-[27px]">
                {trades?.map((trade, idx) => (
                    <Link href={`/token/${trade.token!.token}`}>
                        <span
                            key={idx}
                            className=" flex items-center gap-3 px-3 py-2  top-bar-item "
                        >
                            <div className="w-[38px] h-[38px] relative">
                                <Image
                                    src={trade.token!.icon}
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <h1
                                className={clsx("text-[24px]", {
                                    "text-[#19FB9B]": trade.isBuy,
                                    "text-[#FB191D]": !trade.isBuy,
                                })}
                            >
                                $
                                {numberWithCommas(
                                    calcLiquidity(trade.parseReserveAmount, 2)
                                )}
                            </h1>
                            <h1 className="text-[24px]">
                                {trade.token!.symbol}
                            </h1>
                        </span>
                    </Link>
                ))}
            </div>

            <div className="absolute top-0 animate-marquee2 pl-8 flex items-center gap-[27px]">
                {trades?.map((trade, idx) => (
                    <Link href={`/token/${trade.token!.token}`}>
                        <span
                            key={idx}
                            className=" flex items-center gap-3 px-3 py-2  top-bar-item "
                        >
                            <div className="w-[38px] h-[38px] relative">
                                <Image
                                    src={trade.token!.icon}
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <h1
                                className={clsx("text-[24px]", {
                                    "text-[#19FB9B]": trade.isBuy,
                                    "text-[#FB191D]": !trade.isBuy,
                                })}
                            >
                                $
                                {numberWithCommas(
                                    calcLiquidity(trade.parseReserveAmount, 2)
                                )}
                            </h1>
                            <h1 className="text-[24px]">
                                {trade.token!.symbol}
                            </h1>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
