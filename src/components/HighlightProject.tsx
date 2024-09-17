import Link from "next/link";
import Image from "next/image";
import { IToken } from "@/store";
import {
    SOL_PRICE,
    calcLiquidity,
    calcMarketCap,
    calcPriceChange,
    getTokenUrl,
    sliceString,
    timeDiff,
} from "@/utils";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Skeleton from "./Skeleton";
import copy from "copy-to-clipboard";
import clsx from "clsx";

dayjs.extend(utc);

export default function HighlightProject({ token }: { token?: IToken }) {
    if (!token) return <Skeleton h="490px" />;

    return (
        <div className="w-full flex flex-col md:flex-row p-6 gap-7 border-gradient rounded-2xl bg-[#000]">
            <div className="border border-[#334155] rounded-2xl overflow-hidden w-full pt-[125%] md:w-[280px] md:pt-[400px] relative">
                <Image src={token.icon} alt="icon" fill sizes="any" />
            </div>

            <div className="flex-1 flex flex-col justify-between gap-6">
                <div className="flex justify-between">
                    {/* project name */}
                    <h1 className="text-[52px] md:text-[100px]">
                        {token.symbol}
                    </h1>
                    {/* project socials */}
                    <div className="flex gap-2 items-center">
                        {token.link?.website && (
                            <Link href={token.link.website} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/website.svg"
                                            alt="website"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                        {token.link?.telegram && (
                            <Link href={token.link.telegram} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/telegram.svg"
                                            alt="telegram"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                        {token.link?.twitter && (
                            <Link href={token.link.twitter} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/twitter.svg"
                                            alt="twitter"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                        {token.link?.discord && (
                            <Link href={token.link.discord} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/medium.svg"
                                            alt="medium"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}

                        {token.link?.link1 && (
                            <Link href={token.link.link1} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/website.svg"
                                            alt="website"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                        {token.link?.link2 && (
                            <Link href={token.link.link2} target="_blank">
                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/website.svg"
                                            alt="website"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex items-start gap-10">
                    <Link href={getTokenUrl(token.token)}>
                        <div className="text-[#19FB9B] text-[20px] font-bold cursor-pointer">
                            <div className="hidden md:block">
                                Contract: {token.token}
                            </div>
                            <div className="md:hidden">
                                Contract: {sliceString(token.token, 6, 4)}
                            </div>
                        </div>
                    </Link>

                    <div
                        onClick={() => copy(token.token)}
                        className="cursor-pointer w-[20px] h-[24px] relative"
                    >
                        <Image
                            src="/icons/copy.svg"
                            alt="copy"
                            fill
                            sizes="any"
                        />
                    </div>
                </div>

                <p className="text-[#94A3B8]">{token.desc}</p>

                <Link href={`/token/${token.token}`}>
                    <div>
                        <button className="font-vortex md:block py-2 px-6 rounded-md text-[18px] btn-primary">
                            Pump it
                        </button>
                    </div>
                </Link>
                <div className="font-vortex grid grid-cols-1 md:grid-cols-4 gap-[18px]">
                    <div className="flex flex-col items-stretch justify-between gap-6 p-[17px] bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                        <div className="flex justify-between md:text-[16px] 2xl:text-[20px]">
                            <div className="text-[#666666]">PRICE</div>
                            <div
                                className={clsx({
                                    "text-[#19FB9B]":
                                        +calcPriceChange(token.lastPrice) > 0,
                                })}
                            >
                                {calcPriceChange(token.lastPrice)} %
                            </div>
                        </div>
                        <div className="flex justify-between md:text-[20px] 2xl:text-[40px] font-bold leading-[40px] overflow-hidden">
                            <div>{token.lastPrice}</div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap items-stretch justify-between gap-6 p-[17px] bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                        <div className="md:text-[16px] 2xl:text-[20px] text-[#666666]">
                            Marketcap
                        </div>
                        <div className="md:text-[20px] 2xl:text-[40px] font-bold leading-[40px]">
                            $
                            {token.parsedReserve > 0
                                ? calcMarketCap(token.lastPrice)
                                : 0}
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch justify-between gap-6 p-[17px] bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                        <div className="md:text-[16px] 2xl:text-[20px] text-[#666666]">
                            Liquidity
                        </div>
                        <div className="md:text-[20px] 2xl:text-[40px] font-bold leading-[40px]">
                            ${calcLiquidity(token.parsedReserve)}
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch justify-between gap-6 p-[17px] bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                        <div className="md:text-[16px] 2xl:text-[20px] text-[#666666]">
                            Created
                        </div>
                        <div className="md:text-[20px] 2xl:text-[40px] font-bold leading-[40px]">
                            {timeDiff(token.timestamp)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
